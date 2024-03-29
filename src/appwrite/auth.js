import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)              // Your API Endpoint
        .setProject(conf.appwriteProjectId);               // Your project ID
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method for login
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrUser :: Error", error);
        }
        return null;
    }

    async logOut(){
        try {
            // await this.account.deleteSession("current");    // for delete a particular session
            await this.account.deleteSessions();                // delete all session where are user logged in
        } catch (error) {
            console.log("Appwrite Service :: LogOut :: Error ", error);
        }
    }
}

export const authService = new AuthService();
export default authService;