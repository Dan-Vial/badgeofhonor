import pg from 'pg'
import 'dotenv/config'
import { exit } from 'process'

const { Client } = pg

// clients will also use environment variables
// for connection information
export const pgClient = new Client()

try {
  await pgClient.connect()

  if (pgClient) {
    console.log('Connexion à postgresql pg réussie !')

    const res = await pgClient.query('SELECT NOW()')
    console.log(res.rows[0].now)

  }
} catch (error) {
  console.log('Connexion à postgresql pg échouée ! Error: ', error)
}

/**
 * clear and exit
 */

process.on('exit', async (code) => {
  console.log(`About to exit with code: ${code}`)
})

process.on('SIGINT', handleClear)
process.on('SIGTERM', handleClear)

async function handleClear() {
  await pgClient.end()
  console.log('\nstop pg.')
  exit()
}
