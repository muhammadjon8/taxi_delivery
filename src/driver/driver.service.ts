import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as FormData from 'form-data';
import * as otpGenerator from 'otp-generator';
import { Repository } from 'typeorm';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import { encode } from '../common/helpers/crypto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { PhoneDriverDto } from './dto/phone-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { Otp } from './entities/otp.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    try {
      const driver = this.driverRepository.create(createDriverDto);
      return await this.driverRepository.save(driver);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll() {
    return this.driverRepository.find();
  }

  async findOne(id: number) {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    await this.driverRepository.update({ id }, updateDriverDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const driver = await this.findOne(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return this.driverRepository.remove(driver);
  }

  async newOtp(phoneUserDto: PhoneDriverDto) {
    const phone = phoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const existingDriver = await this.driverRepository.findOne({
      where: { phone },
    });
    if (!existingDriver) {
      try {
        let token = '';
        // await axios
        //   .post('notify.eskiz.uz/api/auth/login', {
        //     email: 'bekzodtoxtamuratov@gmail.com',
        //     password: 'HAc32ZLTNjQ26zvPsxuPCtMQO20JMNcGyPoGBEG3',
        //   })
        //   .then((res) => {
        //     token = res.data.access_token;
        //     console.log('res', res);
        //   })
        //   .catch((err) => {
        //     console.log('error login =>', err);
        //   });
        const formData = new FormData();
        formData.append('mobile_phone', '998930894182');
        formData.append('message', `Bu Eskiz dan test`);
        formData.append('from', '4546');

        // let resp;

        await axios
          .post('https://notify.eskiz.uz/api/message/sms/send', formData, {
            headers: {
              Authorization: `{token}`,
            },
          })
          .then((res) => {
            resp = res.data;
          })
          .catch((err) => {
            console.log('error send =>', err);
          });
        console.log('Resp test', resp);
        if (resp.status !== 200) {
          throw new ServiceUnavailableException('Error sending OTP');
        }
        const now = new Date();
        const expiration_time = AddMinutesToDate(now, 5);

        const newOtp = this.otpRepository.create({
          otp,
          expiration_time,
          check: phone,
          verified: false,
        });
        await this.otpRepository.save(newOtp);
        const details = {
          timestamp: now,
          check: phone,
          otp_id: newOtp.id,
        };

        const encoded = await encode(JSON.stringify(details));
        return {
          status: 'Success',
          details: encoded,
          message: 'OTP sent successfully',
        };
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new ServiceUnavailableException(
            'Unauthorized: Invalid SMS token',
          );
        }
        throw new ServiceUnavailableException('Error sending OTP');
      }
    } else {
      throw new BadRequestException('Driver already exists');
    }
  }
}
