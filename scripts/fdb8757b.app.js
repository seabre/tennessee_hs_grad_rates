!function(){"use strict";function a(){return $.map($(new Array(8)),function(a,b){return Math.round(80*b/7+20)})}function b(a){var b=parseInt(a);return 0===b?"tn_grad_rate_district_2012_all_grad_rate":1===b?"tn_grad_rate_district_2012_white_grad_rate":2===b?"tn_grad_rate_district_2012_african_american_grad_ate":3===b?"tn_grad_rate_district_2012_hispanic_grad_rate":4===b?"tn_grad_rate_district_2012_asian_grad_rate":5===b?"tn_grad_rate_district_2012_native_american_grad_rate":6===b?"tn_grad_rate_district_2012_male_grad_rate":7===b?"tn_grad_rate_district_2012_female_grad_rate":8===b?"tn_grad_rate_district_2012_economically_disadvantaged_grad_rate":9===b?"tn_grad_rate_district_2012_students_with_disabilities_grad_rate":10===b?"tn_grad_rate_district_2012_limited_english_proficient_grad_rate":void 0}function c(b){var c=a();return isNaN(b)?"cc-null":b>=c[0]&&b<c[1]?"cc1":b>=c[1]&&b<c[2]?"cc2":b>=c[2]&&b<c[3]?"cc3":b>=c[3]&&b<c[4]?"cc4":b>=c[4]&&b<c[5]?"cc5":b>=c[5]&&b<c[6]?"cc6":b>=c[6]&&b<=c[7]?"cc7":void 0}function d(a){var c=a.properties[b($("#graduation_type").val())];$("#school_district").text(a.properties.NAME),$("#rate").text("-"===c?"No Data":c+"%")}function e(a){d(a),d3.select(this).style("filter","url(#drop_shadow)")}function f(){d3.select(this).style("filter",null)}function g(){d3.select("g").attr("transform","scale("+$("#chart").width()/900+")"),$("svg").height(.618*$("#chart").width())}var h=d3.geo.mercator().scale(5500).center([-85.9,35.2461]),i=d3.geo.path().projection(h),j=d3.select("#chart").append("svg").append("g"),k=j.append("defs"),l=k.append("filter").attr("id","drop_shadow").attr("height","300%");l.append("feGaussianBlur").attr("in","SourceAlpha").attr("stdDeviation",5).attr("result","blur"),l.append("feOffset").attr("in","blur").attr("dx",0).attr("dy",0).attr("result","offsetBlur");var m=l.append("feMerge");m.append("feMergeNode").attr("in","offsetBlur"),m.append("feMergeNode").attr("in","SourceGraphic"),d3.select(window).on("resize",g),d3.json("data/tennessee_school_districts.topojson",function(a,d){j.selectAll("path").data(topojson.feature(d,d.objects.tennessee_school_districts).features).enter().append("path").attr("class",function(a){return"district "+c(a.properties[b(0)])}).attr("d",i).on("mouseover",e).on("mouseout",f)}),$("#graduation_type").change(function(){j.selectAll("path").attr("class",function(a){return"district "+c(a.properties[b($("#graduation_type").val())])})}),$(window).load(function(){g()})}();