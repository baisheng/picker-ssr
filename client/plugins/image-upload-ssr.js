import ImageUpload from '../components/image-upload'

export default {
  install (Vue, options) {
    Vue.component(ImageUpload.name, ImageUpload);
  }
}
