const dev = process.env.NODE_ENV !== `production`
export const server = dev ? "http://localhost:8000" : "https://notify-gorega.herokuapp.com";