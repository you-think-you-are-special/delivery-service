const caseThree = require('../case_three')

describe('case_three', () => {
  describe('#validate', () => {
    it('should validate route', async () => {
      await expect(caseThree.validate('E-D')).resolves.toBe(true)
      await expect(caseThree.validate('E-E')).resolves.toBe(true)
    })
  })
})
