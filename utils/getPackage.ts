export type GenericObject = {
  [script: string]: string;
};

export type Meta = {
  [dependency: string]: {
    optional?: boolean;
    [setting: string]: any;
  };
};

export type TypeObject = {
  type: string;
  url: string;
  directory?: string;
};

export type Funding = string | Omit<TypeObject, "directory">;

export type FundingList = Funding[];

export type PackageJson = {
  name: string;
  version: string;
  description: string;
  private?: boolean;
  keywords: string[];
  homepage?: string;
  bugs?: {
    url: string;
    email?: string;
  };
  main: string;
  browser?: string;
  module?: string;
  author: string;
  contributors?: string[];
  license: string;
  scripts: GenericObject;
  dependencies?: GenericObject;
  devDependencies?: GenericObject;
  peerDependencies?: GenericObject;
  peerDependenciesMeta?: Meta;
  bundleDependencies?: string[];
  funding?: Funding | FundingList;
  bin?: GenericObject;
  files?: string[];
  repository?: string | TypeObject;
  config?: GenericObject;
  engines?: GenericObject;
  os?: string[];
  cpu?: string[];
};
