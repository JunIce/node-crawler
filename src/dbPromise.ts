import mysql from 'mysql'
import {MysqlError, PoolConnection, FieldInfo, QueryFunction} from 'mysql'
import Promise from 'bluebird'

export interface DbConfig {
    host: string
    port: number
    user: string
    database: string
    password ?:string
    charset ?: string
}

interface DbInterface {
    pool: any
    createPool: (c: DbConfig) => void
    query: (s: string, params ?: any[]) => Promise<QueryFunction>
    getConnection: () => Promise<PoolConnection>
    end: () => void
}

const instances: any = {}

class Db implements DbInterface {
    pool: any = null

    /**
     * 
     * @param config 
     */
    constructor(config: DbConfig) {
        this.createPool(config)
    }

    /**
     * 
     * @param config 
     */
    createPool(config: DbConfig) {
        this.pool = mysql.createPool(config)
    }

    /**
     * 
     * @param sql 
     * @param params 
     */
    query(sql: string, params ?: any[]):Promise<QueryFunction> {
        let self = this
        return this.getConnection()
            .then(connection => {
                return new Promise((resolve, reject) => {
                    self.pool.query(sql, params, function(err: MysqlError, results: any, fields: any[]) {
                        if(err) {
                            if(connection) connection.release()
                            return reject(err)
                        }
                        connection.release()
                        // return as object
                        let c: any = { results, fields} 
                        resolve(c)
                    })
                })
            })
    }

    getConnection(): Promise<PoolConnection> {
        let self = this
        return new Promise((resolve, reject) => {
            self.pool.getConnection(function(err: MysqlError, connection: PoolConnection): void {
                if(err) {
                    if (connection) connection.release()
                    return reject(err)
                }
                return resolve(connection)
            })
        })
    }

    end() {
        let self = this
        return new Promise((resolve, reject) => {
            self.pool.end(function(err: MysqlError) {
                if(err) {
                    return reject(err)
                }
                resolve()
            })
        })
    }
}

export default function(config: DbConfig,name: string = '_default_' ) {
	if (!instances[name]) {
		instances[name] = new Db(config);
	}
	return instances[name];
}