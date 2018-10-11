const SixPillars = artifacts.require("SixPillars")
const Insect = artifacts.require("Insect")

contract('Insect', function(accounts) {
  let obj
  let sixPillars
  const owner = accounts[1]
  const inscription = 0x1234

  describe('mint', function() {
    beforeEach(async function () {
      obj = await Insect.new()
      sixPillars = await SixPillars.new()
    })

    it("success", async function() {
      await obj.mint(inscription, sixPillars.address, {from: owner})
      const tokenId = await sixPillars.tokenOfOwnerByIndex(owner, 0)
      assert.equal(await sixPillars.ownerOf(tokenId), owner)
      assert.equal((await sixPillars.inscription(tokenId)).toNumber(), inscription)
      assert.equal(await sixPillars.creator(tokenId), obj.address)
    })
  })
})
