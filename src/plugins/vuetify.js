import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


const opts = {
    theme: {
          themes: {
              light: {
                  primary: '#2856B6', // #E53935
                  secondary: '#FFCDD2', // #FFCDD2
              },
          },
      },
  }

export default new Vuetify(opts);
