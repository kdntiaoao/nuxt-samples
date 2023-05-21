export const getPolygonApexesPoints = (apexesCount: number, radius: number) => {
  const points: [number, number][] = []

  for (let i = 0; i < apexesCount; i++) {
    const radian = ((Math.PI * 2) / apexesCount) * i
    points.push([Math.sin(radian) * radius, -Math.cos(radian) * radius])
  }

  return points
}
