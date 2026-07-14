export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export function useRollingSum(hoursMap: Map<string, number>) {
  function getHours(dateStr: string): number {
    return hoursMap.get(dateStr) ?? 0
  }

  function rollingSum(endDate: string, windowDays: number): number {
    let total = 0
    for (let i = 0; i < windowDays; i++) {
      total += getHours(addDays(endDate, -i))
    }
    return Math.round(total * 10) / 10
  }

  return { rollingSum }
}
