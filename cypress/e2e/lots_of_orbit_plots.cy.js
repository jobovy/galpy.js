describe('The lots_of_orbit_plots page', () => {
  it('successfully loads', () => {
      cy.visit('/examples/lots_of_orbit_plots.html')
  })
  it('and makes the plots', () => {
      cy.get('#galpy-orbit-graph-Rz').find('.plot-container')
      cy.get('#galpy-orbit-graph-Et').find('.plot-container')
      cy.get('#galpy-orbit-graph-Enormt').find('.plot-container')
  })
})
