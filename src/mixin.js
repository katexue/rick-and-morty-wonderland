const utils = () => {
  const getTypeSlug = (species) => {
    return species.toLowerCase().replace(/\s/g, '')
  }

  return {
    getTypeSlug
  }
}

export default utils
