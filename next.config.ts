import {NextConfig} from "next";

module.exports = {
    webpack: (config: NextConfig) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
};