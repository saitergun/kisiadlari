export default {
  namespaced: true,

  state: {
    origins: [
      { id: 2, code: 'ara', name: 'Arabic', nameLocale: 'Arapça', nameTdk: 'Ar.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/ara.svg' } },
      { id: 3, code: 'pes', name: 'Persian', nameLocale: 'Farsça', nameTdk: 'Far.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/pes.svg' } }, // İran Farsçası
      { id: 7, code: 'fra', name: 'French', nameLocale: 'Fransızca', nameTdk: 'Fr.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/fra.svg' } },
      { id: 12, code: 'kat', name: 'Georgian', nameLocale: 'Gürcüce', nameTdk: 'Gürcüce', flag: { square: process.env.BASE_URL + 'img/flag/1x1/kat.svg' } },
      { id: 6, code: 'heb', name: 'Hebrew', nameLocale: 'İbranice', nameTdk: 'İbr.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/heb.svg' } },
      { id: 11, code: 'eng', name: 'English', nameLocale: 'İngilizce', nameTdk: 'İng.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/eng.svg' } },
      { id: 9, code: 'ita', name: 'Italian', nameLocale: 'İtalyanca', nameTdk: 'İt.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/ita.svg' } },
      { id: 5, code: 'mon', name: 'Mongolian', nameLocale: 'Moğolca', nameTdk: 'Moğ.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/mon.svg' } },
      { id: 8, code: 'pnt', name: 'Pontic', nameLocale: 'Rumca', nameTdk: 'Rum.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/pnt.svg' } }, // Pontusça, Pontus Rumcası
      { id: 10, code: 'sog', name: 'Sogdian', nameLocale: 'Soğdca', nameTdk: 'Soğd.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/sog.svg' } },
      { id: 1, code: 'tur', name: 'Turkish', nameLocale: 'Türkçe', nameTdk: 'T.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/tur.svg' } },
      { id: 4, code: 'grc', name: 'Greek', nameLocale: 'Yunanca', nameTdk: 'Yun.', flag: { square: process.env.BASE_URL + 'img/flag/1x1/grc.svg' } } // Antik Yunanca
    ],

    genders: [
      { id: 1, name: 'Female', nameLocale: 'Dişi' },
      { id: 2, name: 'Male', nameLocale: 'Erkek' },
      { id: 3, name: 'Unisex', nameLocale: 'Üniseks' }
    ],

    names: [],

    dataLastUpdateDate: 1560203445881
  },

  getters: {},

  mutations: {
    pushNames (s, p) {
      s.names.push(...p)
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

    async set ({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        fetch(rootState.app.publicPath + 'data/names.json').then(response => response.json()).then(response => {
          try {
            commit('pushNames', response)

            localStorage.setItem('kasData', JSON.stringify(response))
            localStorage.setItem('kasDataLastUpdate', Date.now())

            resolve()
          } catch (e) {
            const error = 'verileri tarayıcına kaydedemedik. muhtemel olarak kapatıp açınca düzelir.'

            reject(error)
          }
        }).catch(error => reject(error))
      })
    }
  }
}
