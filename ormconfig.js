/*
 * ormconfig.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

module.exports = {
    type: 'mariadb',
    host: "db",
    port: 3306,
    username: "nest",
    password: "nest",
    database: "nest",
    entities: [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
}

