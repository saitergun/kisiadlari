import names from '../data/names.json'

const origins = [
  {
    id: 2,
    code: 'ara',
    name: 'arabic',
    nameLocale: 'arapça',
    nameTdk: 'ar.',
    flag: {
      square: require('../assets/images/flags/1x1/ara.svg'),
      rectangle: require('../assets/images/flags/4x3/ara.svg')
    }
  },
  {
    id: 3,
    code: 'pes',
    name: 'persian',
    nameLocale: 'farsça',
    nameTdk: 'far.',
    flag: {
      square: require('../assets/images/flags/1x1/pes.svg'),
      rectangle: require('../assets/images/flags/4x3/pes.svg')
    }
  }, // İran Farsçası
  {
    id: 7,
    code: 'fra',
    name: 'french',
    nameLocale: 'fransızca',
    nameTdk: 'fr.',
    flag: {
      square: require('../assets/images/flags/1x1/fra.svg'),
      rectangle: require('../assets/images/flags/4x3/fra.svg')
    }
  },
  {
    id: 12,
    code: 'kat',
    name: 'georgian',
    nameLocale: 'gürcüce',
    nameTdk: 'gürcüce',
    flag: {
      square: require('../assets/images/flags/1x1/kat.svg'),
      rectangle: require('../assets/images/flags/4x3/kat.svg')
    }
  },
  {
    id: 6,
    code: 'heb',
    name: 'hebrew',
    nameLocale: 'ibranice',
    nameTdk: 'ibr.',
    flag: {
      square: require('../assets/images/flags/1x1/heb.svg'),
      rectangle: require('../assets/images/flags/4x3/heb.svg')
    }
  },
  {
    id: 11,
    code: 'eng',
    name: 'english',
    nameLocale: 'ingilizce',
    nameTdk: 'ing.',
    flag: {
      square: require('../assets/images/flags/1x1/eng.svg'),
      rectangle: require('../assets/images/flags/4x3/eng.svg')
    }
  },
  {
    id: 9,
    code: 'ita',
    name: 'italian',
    nameLocale: 'italyanca',
    nameTdk: 'it.',
    flag: {
      square: require('../assets/images/flags/1x1/ita.svg'),
      rectangle: require('../assets/images/flags/4x3/ita.svg')
    }
  },
  {
    id: 5,
    code: 'mon',
    name: 'mongolian',
    nameLocale: 'moğolca',
    nameTdk: 'moğ.',
    flag: {
      square: require('../assets/images/flags/1x1/mon.svg'),
      rectangle: require('../assets/images/flags/4x3/mon.svg')
    }
  },
  {
    id: 8,
    code: 'pnt',
    name: 'pontic',
    nameLocale: 'rumca',
    nameTdk: 'rum.',
    flag: {
      square: require('../assets/images/flags/1x1/pnt.svg'),
      rectangle: require('../assets/images/flags/4x3/pnt.svg')
    }
  }, // Pontusça, Pontus Rumcası
  {
    id: 10,
    code: 'sog',
    name: 'sogdian',
    nameLocale: 'soğdca',
    nameTdk: 'soğd.',
    flag: {
      square: require('../assets/images/flags/1x1/sog.svg'),
      rectangle: require('../assets/images/flags/4x3/sog.svg')
    }
  },
  {
    id: 1,
    code: 'tur',
    name: 'turkish',
    nameLocale: 'türkçe',
    nameTdk: 't.',
    flag: {
      square: require('../assets/images/flags/1x1/tur.svg'),
      rectangle: require('../assets/images/flags/4x3/tur.svg')
    }
  },
  {
    id: 4,
    code: 'grc',
    name: 'greek',
    nameLocale: 'yunanca',
    nameTdk: 'yun.',
    flag: {
      square: require('../assets/images/flags/1x1/grc.svg'),
      rectangle: require('../assets/images/flags/4x3/grc.svg')
    }
  } // Antik Yunanca
]

const genders = [
  {
    id: 1,
    name: 'female',
    nameLocale: 'dişi'
  },
  {
    id: 2,
    name: 'male',
    nameLocale: 'erkek'
  },
  {
    id: 3,
    name: 'unisex',
    nameLocale: 'üniseks'
  }
]

export default {
  namespaced: true,

  state: {
    origins,
    genders,

    names: []
  },

  mutations: {
    pushNames (state, payload) {
      state.names.push(...payload)
    }
  },

  actions: {
    async check ({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        let setData = false

        if (state.names.length) {
          resolve()
        }

        if (typeof (Storage) === 'undefined') {
          const error = 'adları bilgisayarının belleğinde (yerel depo) saklayacağız ama bu özelliği desteklemeyen ya da kapatılmış bir tarayıcı kullanıyorsun.'

          reject(error)
        }

        if (localStorage.kasData === undefined || localStorage.kasDataLastUpdate === undefined) {
          setData = true
        }

        // local stored data is up-to-date
        if (Number(localStorage.kasDataLastUpdate) > state.dataLastUpdateDate) {
          try {
            commit('pushNames', JSON.parse(localStorage.kasData))

            resolve()
          } catch (e) {
            setData = true
          }
        } else {
          setData = true
        }

        if (setData) {
          dispatch('set').then(() => resolve()).catch(error => reject(error))
        }
      })
    },

    async set ({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('pushNames', names)

          resolve()
        } catch (e) {
          const error = 'verileri tarayıcına kaydedemedik. muhtemel olarak kapatıp açınca düzelir.'

          reject(error)
        }
      })
    }
  }
}
