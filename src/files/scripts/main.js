(function ($) {

    // External link
    // ===========
    $(document).on('click a[rel=external]', function (event) {
        event.preventDefault()
        window.open(this.href)
    })

    // Location map
    // ===========
    window.locationmap = function () {
        var container = $('#map-canvas')
          , address   = container.attr('data-address')
          , options   = {
                zoom: 16
              , scrollwheel: false
              , mapTypeControl: false
              , labels: true
              , zoomControlOptions: {
                  position: google.maps.ControlPosition.TOP_RIGHT
                }
              , mapTypeId: google.maps.MapTypeId.ROADMAP
           }
        
        var map    = new google.maps.Map(container.get(0), options)
          , search = new google.maps.Geocoder()

        search.geocode({ address: address }, function (data) {
            var location = data[0].geometry.location

            new google.maps.Marker({
                map: map
              , position: location
            })
            map.setCenter(location)
        })
    }

    // Scroll spy
    // ===========
    
    ScrollSpy = {
        scrollLast: 0
      , nav: $('nav')
      , active: $()
    }

    ScrollSpy.init = function () {
        this.addEventListeners()
        this.sections = this.getSections()
    }

    ScrollSpy.getSections = function () {
        return $('section').elements.map(function(element){
            return {
                id: element.id
              , offset: element.getBoundingClientRect().top - 20
            }
        })
    }

    ScrollSpy.getActive = function () {
        var scroll = window.scrollY
          , id = null

        for (var i = 0, l = this.sections.length; i < l; i++) {
            if (this.sections[i].offset > scroll) {
                if (i > 0) {
                    id = this.sections[i - 1].id
                }
                break
            }
        }
        return id
    }

    ScrollSpy.addEventListeners = function () {
        $(document).on('scroll', this.onScroll.bind(this))
    }

    ScrollSpy.onScroll = function (event) {
        if ((Date.now() - this.scrollLast) > 50) {
            this.scrollLast = Date.now()
            this.menu()
        }
    }

    ScrollSpy.menu = function () {
        var id = this.getActive()
          , item = this.nav.find('a[href="#' + id + '"]')

        this.active.removeClass('active')
        
        item.addClass('active')
        this.active = item.addClass('open')

        this.nav.toggleClass('fixed', this.active.length)
    }

    ScrollSpy.init()

})(Rye)