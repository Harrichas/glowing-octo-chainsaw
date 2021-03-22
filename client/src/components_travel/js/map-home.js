//    Map JS
   function initialize() {
        var earth = new WE.map('earth_div');
        WE.tileLayer(
            'https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg',
            {
                tileSize: 256,
                bounds: [
                    [-85, -180],
                    [85, 180],
                ],
                minZoom: 0,
                maxZoom: 16,
                attribution: 'WebGLEarth example',
                tms: true,
            }
        ).addTo(earth);

        var marker = WE.marker([51.5, -0.09]).addTo(earth);
        marker
            .bindPopup(
                "<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>",
                { maxWidth: 150, closeButton: true }
            )
            .openPopup();

        var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
        marker2.bindPopup('<b>Cairo</b><br>Yay, you found me!', {
            maxWidth: 120,
            closeButton: false,
        });
        var before = null;
        requestAnimationFrame(function animate(now) {
            var c = earth.getPosition();
            var elapsed = before ? now - before : 0;
            before = now;
            earth.setCenter([c[0], c[1] + 0.3 * (elapsed / 30)]);
            requestAnimationFrame(animate);
        });
        earth.setView([2.8011, 8.2266], 2.2);
    };
// Scroll JS
$(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
        // can be whatever, 0 refers to the top space you allow
        $('.move').slideUp('slow'); // Hide your element
    } else {
        $('.move').slideDown('slow'); // It's just if you want to show back the element if we're back on top
    }
});