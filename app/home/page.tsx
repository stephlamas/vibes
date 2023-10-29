'use client'  
import React from "react";
import { Dashboard } from "../layout/components/dashboard/dashboard";
import { Layout } from "../layout/components/Layout";

export default function HomePage() {
    
    return (
        <Layout>
            <Dashboard />
        </Layout>
    );
}