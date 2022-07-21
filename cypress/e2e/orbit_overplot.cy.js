describe('The orbit_overplot page', () => {
  it('successfully loads', () => {
      cy.visit('/examples/orbit_overplot.html')
      cy.get('#galpy-orbit-graph').find('.plot-container')
  })
  it('and makes the plot', () => {
      cy.get('#galpy-orbit-graph').find('.plot-container')
  })
})
