declare module '@strapi/strapi' {
    export const factories: {
      createCoreController: (uid: string) => any;
      createCoreService: (uid: string) => any;
      createCoreRouter: (uid: string) => any;
    };
  }
  
  declare module '@strapi/strapi/admin' {
    export interface StrapiApp {
      // Add any properties you need here
      config: any;
    }
  }