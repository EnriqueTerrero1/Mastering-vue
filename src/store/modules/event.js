import EventService from "@/services/EventService";

export const namespaced = true
export const state = {
    total_events_count:0,
    count: 0,
    user: { id: 'abc123', name: 'Enrique Terrero' },
    events: [],
    event: {},


}

export const getters = {
    carLength: state => {
        return state.categories.length
    },

    getEventById: state => id => {
        console.log(id)
        return state.events.find(event => event.id === id)
    },
    getTotalPages: state => {
        console.log(state.total_events_count)
        return state.total_events_count / 3;
    }

}
export const mutations = {

    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {

        state.events = events
    },
    SET_EVENT(state, event) {
        state.event = event
    },
    SET_TOTAL_EVENT_COUNT(state,count){
        console.log(count+"p")
        state.total_events_count =count/3
        console.log( state.total_events_count)
    }
}
export const actions = {

    createEvent({ commit,dispatch }, event) {
        return EventService.postEvent(event).then(() => { commit('ADD_EVENT', event)
        const notification ={
            type:'success',
            message:'Your event has been created!'
        }
        dispatch('notification/add', notification,{root:true})
        .catch(error => {
            const notification ={
                type:'error',
                message:'there was a problem creating your event: '+ error.message
            }
            dispatch('notification/add', notification,{root:true})
            throw error
     })
    })
    },

    fetchEvents({ commit,dispatch }, { perPage, page }) {

        EventService.getEvents(perPage, page)
            .then(response => {
             
                commit('SET_TOTAL_EVENT_COUNT',response.headers['x-total-count'])
                commit('SET_EVENTS', response.data)
            })
            .catch(error => {
                const notification ={
                    type:'error',
                    message:'There was a problem fetching events: '+ error.message
                }
                dispatch('notification/add', notification,{root:true})
            })
    },
    fetchEvent({ commit, getters,dispatch }, id) {
        var event = getters.getEventById(id)
        if (event) {
            commit('SET_EVENT', event)
        } else {
            return    EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data)
                })
                .catch(error => {
                    const notification ={
                        type:'error',
                        message:'There was a problem fetching event: '+ error.message
                    }
                    dispatch('notification/add', notification,{root:true})
                })
        }
    }

}