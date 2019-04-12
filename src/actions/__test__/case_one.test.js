const caseOne = require('../case_one')

describe('case_one', () => {
  describe('#validate', () => {
    it('should validate route', async () => {
      await expect(caseOne.validate('A-B-E')).resolves.toBe(true)
      await expect(caseOne.validate('A-D')).resolves.toBe(true)
      await expect(caseOne.validate('E-A-C-F')).resolves.toBe(true)
      await expect(caseOne.validate('A-D-F')).resolves.toBe(true)
    })
  })
})
