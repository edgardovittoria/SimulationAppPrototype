import faunadb from 'faunadb';

export const client = new faunadb.Client({
    secret: 'fnAElR7D9uAAwIMHtPtrjCuz-u07dab_kltE1a3w',
    domain: 'db.eu.fauna.com',
    port: 443,
    scheme: 'https',
})

export const q = faunadb.query