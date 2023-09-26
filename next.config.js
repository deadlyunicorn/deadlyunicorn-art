const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true
  },
  images:{
    domains:['deadlyunicorn-art.s3.eu-central-1.amazonaws.com']
  }
}

module.exports = nextConfig
