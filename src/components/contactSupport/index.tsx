import React from "react";
import { Layout } from "@/layout/layout";
import ContactSupportForm from './ContactSupportForm'


export default function ContactSupport() {
    return (
        <Layout>
            <div className="flex justify-between items-center">
                <h1 className="text-xl text-[#222B45] ">Contact & Support</h1>
            </div>

            <div className="flex mt-5">
                <ContactSupportForm />
            </div>
        </Layout>
    );
}
