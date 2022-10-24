export type DocumentTypes = {
    default: {};
    sharePurchase: {
        shares: number;
        investorfirstname: string;
        investorlastname: string;
        investorphone: string;
        investorinitial: string;
        investorcompanyname: string;
        investorprimaryphonecontact: string;
        investoraddress: string;
        investortown: string;
        investorstate: string;
        investorCountry: string;
        investorzip: string;
        investoremail: string;
        projectname: string;
        currentDate: string;
        totalprice: number;
        shareprice:number;
        sharecurrency:string;
    };
};

// type DocumentTypeName<A> = {
//     title: string;
//     fields: { [id in keyof A]: string };
// };

// // export const documentTypeNames: {
// //     [id in keyof DocumentTypes]: DocumentTypeName<DocumentTypes[id]>;
// // } = {
// //     default: {
// //         title: "default",
// //         fields: {},
// //     },
// //     sharePurchase: {
// //         title: "Share purchasing",
// //         fields: {
// //             shares: "number",
// //             investorfirstname: "string",
// //             investorlastname: "string",
// //             investorphone: "string",
// //             investorinitial: "string",
// //             investorcompanyname: "string",
// //             investorprimaryphonecontact: "string",
// //             investoraddress: "string",
// //             investortown: "string",
// //             investorstate: "string",
// //             investorCountry:'',
// //             investorzip: "string",
// //             investoremail: "string",
// //             projectname: "string",
// //             currentDate: "string",
// //             totalprice: "number",
// //         },
// //     },
// // };
