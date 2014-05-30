(function() {
  'use strict';

  var width = 900,
      height = 500;

  var projection = d3.geo.mercator()
      .center([-86.3921, 35.8461])
      .scale(1200 * 4.75)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  function dataRanges(){
    return $.map($(new Array(8)), function(val, i) { return Math.round((i * 80/7.0) + 20); });
  }

  function graduationType(v){
    var n = parseInt(v);

    if (n === 0) {
      return 'tn_grad_rate_district_2012_all_grad_rate';
    } else if (n === 1) {
      return 'tn_grad_rate_district_2012_white_grad_rate';
    } else if (n === 2) {
      return 'tn_grad_rate_district_2012_african_american_grad_ate';
    } else if (n === 3) {
      return 'tn_grad_rate_district_2012_hispanic_grad_rate';
    } else if (n === 4) {
      return 'tn_grad_rate_district_2012_asian_grad_rate';
    } else if (n === 5) {
      return 'tn_grad_rate_district_2012_native_american_grad_rate';
    } else if (n === 6) {
      return 'tn_grad_rate_district_2012_male_grad_rate';
    } else if (n === 7) {
      return 'tn_grad_rate_district_2012_female_grad_rate';
    } else if (n === 8) {
      return 'tn_grad_rate_district_2012_economically_disadvantaged_grad_rate';
    } else if (n === 9) {
      return 'tn_grad_rate_district_2012_students_with_disabilities_grad_rate';
    } else if (n === 10) {
      return 'tn_grad_rate_district_2012_limited_english_proficient_grad_rate';
    }
  }

  function dataClass(d) {
    var ranges = dataRanges();

    if (isNaN(d)) {
      return 'cc-null';
    } else if (d >= ranges[0] && d < ranges[1]) {
      return 'cc1';
    } else if (d >= ranges[1] && d < ranges[2]) {
      return 'cc2';
    } else if (d >= ranges[2] && d < ranges[3]) {
      return 'cc3';
    } else if (d >= ranges[3] && d < ranges[4]) {
      return 'cc4';
    } else if (d >= ranges[4] && d < ranges[5]) {
      return 'cc5';
    } else if (d >= ranges[5] && d < ranges[6]) {
      return 'cc6';
    } else if (d >= ranges[6] && d <= ranges[7]) {
      return 'cc7';
    }
  }

  function populateInfo(t) {
    $('#school_district').text(t.properties.NAME);
    $('#rate').text(t.properties[graduationType($('#graduation_type').val())] + '%');
  }

  function mouseover(d) {
    populateInfo(d);

    // jshint validthis: true
    d3.select(this).style('filter', 'url(#drop_shadow)');
  }

  function mouseout() {
    // jshint validthis: true
    d3.select(this).style('filter', null);
  }

  var svg = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMinYMin meet');

  var defs = svg.append('defs');

  var filter = defs.append('filter')
      .attr('id', 'drop_shadow')
      .attr('height', '300%');

  filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 5)
      .attr('result', 'blur');

  filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 0)
      .attr('dy', 0)
      .attr('result', 'offsetBlur');

  var feMerge = filter.append('feMerge');

  feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur');

  feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

  d3.json('data/tennessee_school_districts.topojson', function(error, tn) {
    svg.selectAll('path')
      //jshint camelcase: false
      .data(topojson.feature(tn, tn.objects.tennessee_school_districts).features)
    .enter().append('path')
      .attr('class', function(d) { return 'district ' + dataClass(d.properties[graduationType(0)]); })
      .attr('d', path)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);
  });

  $('#graduation_type').change(function() {
    svg.selectAll('path')
    .attr('class', function(d) { return 'district ' + dataClass(d.properties[graduationType($('#graduation_type').val())]); });
  });
})();
