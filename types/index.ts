export type RESASPrefectures = {
  message: null;
  result: { prefCode: number; prefName: string }[];
};

export type RESASPopulation = {
  message: null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: { year: number; value: number; rate?: number }[];
    }[];
  };
};

export type Prefecture = {
  id: number;
  name: string;
};

export type Population = {
  prefCode: number;
  prefName: string;
  data: { year: number; value: number }[];
}[];
