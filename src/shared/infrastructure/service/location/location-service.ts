class LocationService {
  /**
   * Obter distância em KM a partir de latitude e longitude de duas posições
   * @name distanceInKmFromLatitudeAndLongitude
   * @public
   * @param {any} position1 - posição 1
   * @param {any} position2 - posição 2
   * @returns {string}
   */
  static distanceInKmFromLatitudeAndLongitude(position1, position2): string {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180)
    }

    const R = 6371
    const dLat = deg2rad(position2.lat - position1.lat)
    const dLng = deg2rad(position2.lng - position1.lng)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(position1.lat)) *
        Math.cos(deg2rad(position1.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c * 1000).toFixed()
  }
}

export default LocationService
