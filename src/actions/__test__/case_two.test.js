const caseTwo = require('../case_two')

describe('case_two', () => {
  describe('#validate', () => {
    it('should validate route', async () => {
      await expect(caseTwo.validate('E-D maxStops:4')).resolves.toBe(true)
      await expect(caseTwo.validate('E-E')).resolves.toBe(true)
      await expect(caseTwo.validate('E-E maxCost:20 repeat:2')).resolves.toBe(true)
    })
  })
})
