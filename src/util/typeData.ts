export type TrainData = {
  amount: number;
  arriveTime: string;
  avaliable_seats: number;
  currency: string;
  departureTime: string;
  distance: number;
  endLat: number;
  endLon: number;
  endStation: string;
  endStationCode: string;
  endStationId: number;
  ends: string;
  id: string;
  logo: string;
  maxroute: number;
  noStops: number;
  platform: string;
  provider: string;
  route: number;
  startLat: number;
  startLon: number;
  startStation: string;
  startStationCode: string;
  startStationId: number;
  starts: string;
  ticketType: string;
  trainType: string;
  travelMode: string;
  travelTime: number;
};

export type ExtractedTrainData = {
  trainType: string;
  starts: string;
  platform: string;
  currency: string;
  amount: number;
  departureTime: string;
  arriveTime: string;
  travelMode: string;
  provider: string;
};

export type FormattedTrainData = {
  id: string;
  title: string;
  description: string;
};
