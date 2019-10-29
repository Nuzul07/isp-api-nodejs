'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sarana extends Model {
    static get table () {
        return 'sarana'
    }

    kodefikasi() {
        return this.hasMany('App/Models/Kodefikasi')
    }

    users() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Sarana
