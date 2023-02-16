module.exports = {
  CSS: {
    loaderOptions: {
      sass: {
        prependData: " @import '@/assets/styles.scss'; ",
      },
    },
  },
};
