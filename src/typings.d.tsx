//type overrides for this application

import "express";
import "express-serve-static-core";
import "express-session";

declare module "express-serve-static-core" { 
    interface Response{
        /**
         * A template for a html page
         * @param title the title of the page
         * @param resources resources used in the page
         * @param body the body of the page
         * @returns the completed page
         */
        template: (title: string, options: {scripts?: string[], styles?: string[], header?: boolean, footer?: boolean, httpStatus?: number, noCore?: boolean}, body : any) => void;
    }
}

declare module "express-session" {
    interface SessionData {
        user?: string
        userStatus?: string

        /**
         * Promisified
         */
        saveAsync: () => Promise<void>;
        destroyAsync: () => Promise<void>;
    }
}