describe('The orbit_restyle page', () => {
  it('successfully loads', () => {
      cy.visit('/examples/orbit_restyle.html')
      cy.get('#galpy-orbit-graph').find('.plot-container')
  })
  it('and makes the plot', () => {
      cy.get('#galpy-orbit-graph').find('.plot-container')
  })
  it('clicking the "change b" button updates the value of b (and, thus, the plot)', () => {
      cy.get('#change-b-btn').click()
      cy.get('#bvalue-galpy-orbit-graph').invoke('text').should((text) => {
	  expect(text).not.to.eq('0.2')
      });
  })
})
