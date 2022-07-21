describe('The simple_orbit_plot page without plotly', () => {
    it('throws the expected Plotly error', () => {
	cy.on('uncaught:exception', (err, runnable) => {
	    if ( err.message.includes('To plot an orbit, please load Plotly') )
		return false
	    else
		return true
	})
      cy.visit('/browser-tests/simple_orbit_plot_woplotly.html')
    })
})
