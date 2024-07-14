export class CreateTaxiOrderDto {
  from_district_id: number;
  to_district_id: number;
  date: string;
  description: string;
  location_start: string;
}
