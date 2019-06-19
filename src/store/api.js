export default {
  namespaced: true,

  actions: {
    async quickSearch ({ rootState }, query) {
      return new Promise((resolve, reject) => {
        if (query !== undefined && query !== '') {
          // get all names
          let items = rootState.data.names

          // name search
          items = items.filter(item => item.n.length >= query.length && item.n.match(new RegExp(query
            .replace(new RegExp('[aAÂâ]', 'gi'), '[aAÂâ]')
            .replace(new RegExp('[iİIıîÎ]', 'gi'), '[iİIıîÎ]')
            .replace(new RegExp('[üÜuUÛû]', 'gi'), '[üÜuUÛû]')
            .replace(new RegExp('[cCÇc]', 'gi'), '[cCÇc]')
            .replace(new RegExp('[gGĞg]', 'gi'), '[gGĞg]')
            .replace(new RegExp('[sSŞş]', 'gi'), '[sSŞş]')
            .replace(new RegExp('[oOÖö]', 'gi'), '[oOÖö]'), 'gi')))

          // data order scoring
          items = items.map((item) => {
            const toLocaleString = string => string.toLocaleLowerCase('tr-TR')
              .replace('â', 'a')
              .replace('Â', 'a')
              .replace('î', 'i')
              .replace('Î', 'i')
              .replace('İ', 'i')
              .replace('ı', 'i')
              .replace('û', 'u')
              .replace('Û', 'u')
              .replace('ü', 'u')
              .replace('Ü', 'u')
              .replace('ş', 's')
              .replace('Ş', 's')
              .replace('ö', 'o')
              .replace('Ö', 'o')
              .replace('ç', 'c')
              .replace('Ç', 'c')

            const nameLocaleLowerCase = toLocaleString(item.n)
            const queryLocaleLowerCase = toLocaleString(query)

            const indexOf = nameLocaleLowerCase.indexOf(queryLocaleLowerCase)
            const isExactMatch = queryLocaleLowerCase.length === nameLocaleLowerCase.length

            let score = 0

            if (!isExactMatch && indexOf === 0) {
              score = 1 + Number((nameLocaleLowerCase.slice(queryLocaleLowerCase.length).length / 10).toFixed(2))
            }

            if (!isExactMatch && indexOf !== 0) {
              score = 3 + Number((nameLocaleLowerCase.replace(queryLocaleLowerCase, '').length / 10).toFixed(2))
            }

            return {
              id: item.id,
              name: item.n,
              score
            }
          })

          // data sort by score and set limit
          items = items.sort((a, b) => a.score - b.score).slice(0, 15)

          resolve(items)
        } else {
          resolve([])
        }
      })
    },

    async nameById ({ rootState }, id) {
      return new Promise(resolve => {
        id = Number(id)
        let item = rootState.data.names.find(item => item.id === id)

        let response = {
          id: item.id,
          gender: rootState.data.genders.find(gender => gender.id === item.gid) || null,
          name: item.n,
          namesSeparately: item.ns ? item.ns.map(ns => {
            return {
              name: ns.n,
              origin: rootState.data.origins.find(origin => origin.id === ns.oid)
            }
          }) : [],
          origins: item.o.map(oid => rootState.data.origins.find(origin => origin.id === oid)),
          significations: item.s || [],
          pronunciation: item.p || null,
          description: item.d || null
        }

        resolve(response)
      })
    },

    async filter ({ rootState }, filter) {
      return new Promise(resolve => {
        let items = rootState.data.names

        let filterHasQuery = filter.query !== undefined && filter.query !== ''
        let filterHasOrigins = filter.origins !== undefined && filter.origins.length
        let filterHasGenders = filter.genders !== undefined && filter.genders.length

        let perPage = 15
        let page = filter.page

        if (isNaN(page) || page === 0) {
          page = 1
        }

        // arama terimi girilmiş
        if (filterHasQuery) {
          // adların olduğu array (store/data.js/state/names) içinde arayıp filtreliyoruz
          items = items.filter(item => item.n.length >= filter.query.length && [item.n, item.s.join(' ')].join(' ').match(new RegExp(filter.query
            .replace(new RegExp('[aAÂâ]', 'gi'), '[aAÂâ]')
            .replace(new RegExp('[iİIıîÎ]', 'gi'), '[iİIıîÎ]')
            .replace(new RegExp('[üÜuUÛû]', 'gi'), '[üÜuUÛû]')
            .replace(new RegExp('[cCÇc]', 'gi'), '[cCÇc]')
            .replace(new RegExp('[gGĞg]', 'gi'), '[gGĞg]')
            .replace(new RegExp('[sSŞş]', 'gi'), '[sSŞş]')
            .replace(new RegExp('[oOÖö]', 'gi'), '[oOÖö]'), 'gi')))
        }

        // köken seçilmiş
        if (filterHasOrigins) {
          // seçilen kökenlere ait olanları kontrol edip ediyoruz filtreliyoruz
          items = items.filter(item => {
            if (filter.originsTypeExact) {
              return JSON.stringify(filter.origins.sort((a, b) => (a - b))) === JSON.stringify([...item.o].sort((a, b) => (a - b)))
            } else {
              return filter.origins.some(itemSome => item.o.includes(itemSome))
            }
          })
        }

        // cinsiyet seçilmiş
        if (filterHasGenders) {
          // seçilen cinsiyetlere ait olanları kontrol edip ediyoruz filtreliyoruz
          items = items.filter(item => filter.genders.includes(item.gid))
        }

        let countItems = items.length
        let countPages = Math.ceil(countItems / perPage)

        if (page > countPages) {
          page = countPages
        }

        let offset = (page - 1) * perPage
        let limit = offset + perPage

        items = items.slice(offset, limit)

        items = items.map(item => ({
          id: item.id,
          gender: rootState.data.genders.find(gender => gender.id === item.gid) || null,
          name: item.n,
          origins: item.o.map(oid => rootState.data.origins.find(origin => origin.id === oid)),
          significations: item.s || []
        }))

        resolve({
          success: true,
          countItems: countItems,
          items,
          pagination: {
            hasNextPage: countPages > page
          }
        })
      })
    }
  }
}
