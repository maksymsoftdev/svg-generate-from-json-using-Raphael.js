var json_str = {
    "source":{
       "type":"external",
       "server":"10.164.178.7",
       "protocol":"ssh",
       "iconImage":"icons/pull.png"
    },
    "nodes":{
       "source":{
          "name":"jde",
          "labels":[
             {
                "name":"Site",
                "value":"Bank_Application"
             },
             {
                "name":"Folder",
                "value":"/DTS_DESC_BPMFile"
             },
             {
                "name":"Size",
                "value":"19.30kb"
             },
             {
                "name":"Date Time",
                "value":"Today 12:45pm"
             },
             {
                "name":"Application",
                "value":"Bank_Loan_Application"
             }
          ],
          "button":{
             "backgroundColor":"#00FF00",
             "text":"Resubmit",
             "color":"#FFF",
             "url":"/my-resubmit-url"
          },
          "icon":{
             "backgroundColor":"#00FF00",
             "iconImage":"icons/success-icon.png"
          }
       },
       "targets":[
          {
             "type":"external",
             "server":"sqlprod.local.com.au",
             "protocol":"smb",
             "iconImage":"icons/push.png",
             "button":{
                "backgroundColor":"#00FF00",
                "color":"#FFF",
                "text":"Resubmit",
                "url":"/my-resubmit-url"
             },
             "icon":{
                "backgroundColor":"#00FF00",
                "iconImage":"icons/success-icon.png"
             }
          },
          {
             "type":"node",
             "name":"rla",
             "labels":[
                {
                   "name":"Site",
                   "value":"OnDemand"
                },
                {
                   "name":"Folder",
                   "value":"/RLA_OnDemand"
                },
                {
                   "name":"Size",
                   "value":"19.30kb"
                },
                {
                   "name":"Date Time",
                   "value":"Today 10:32am"
                }
             ],
             "button":{
                "backgroundColor":"#00FF00",
                "text":"Resubmit",
                "url":"/my-resubmit-url"
             },
             "icon":{
                "backgroundColor":"#00FF00",
                "icon":"icons/failed-icon.png"
             },
             "targets":[
                {
                   "type":"external",
                   "server":"oracleprod.local.com.au",
                   "protocol":"ssh",
                   "iconImage":"icons/push.png",
                   "button":{
                      "backgroundColor":"#00FF00",
                      "color":"#FFF",
                      "text":"Resubmit",
                      "url":"/my-resubmit-url"
                   },
                   "icon":{
                      "backgroundColor":"#00FF00",
                      "iconImage":"icons/success-icon.png"
                   }
                }
             ]
          },
          {
             "type":"external",
             "server":"oracleprod.local.com.au",
             "protocol":"ssh",
             "iconImage":"icons/push.png",
             "button":{
                "backgroundColor":"#00FF00",
                "color":"#FFF",
                "text":"Resubmit",
                "url":"/my-resubmit-url"
             },
             "icon":{
                "backgroundColor":"#00FF00",
                "iconImage":"icons/success-icon.png"
             }
          }
       ]
    }
 }
 
 
 
;

function reSubmit() {
  $.post('/jquery/submitData', {
          myData: 'This is my data.'
      }, function(data, status, xhr) {
          $('p').append('status: ' + status + ', data: ' + data);
      }).done(function() {
          alert('Request done!');
      })
      .fail(function(jqxhr, settings, ex) {
          alert('failed, ' + ex);
      });
}

function polygonPath(points) {
  if (!points || points.length < 2)
      return [];
  var path = []; //will use path object type
  path.push(['m', points[0], points[1]]);
  for (var i = 2; i < points.length; i += 2) {
      path.push(['l', points[i], points[i + 1]]);
  }
  path.push(['z']);
  return path;
}


class JsonConverter {
  constructor(id, jObj, w, h, cx, cy) {
      this.svgContainer = document.getElementById(id);
      this.jsonObj = jObj;
      this.width = w;
      this.height = h;
      this.cx = cx;
      this.cy = cy;
      this.arrow_stroke_width = 6;
      this.stroke_color = "#3d5e96";
      this.paper = Raphael(this.svgContainer, this.width, this.height);
      this.top = 0;
      this.bottom = 0;
      this.middle = 0;
  }

  getPositionIndex = (deepth) => {
    switch(deepth) {
        case 1:
            this.middle = 3;
            this.bottom = this.top = 3;
            break;
        case 2:
            this.middle = this.top = 3;
            this.bottom = 2;
            break;
        case 3:
            this.middle = 3;
            this.top = 4;
            this.bottom = 2;
            break; 
        case 4:
            this.middle = 3;
            this.top = 4;
            this.bottom = 1;
            break; 
        case 5:
            this.middle = 3;
            this.top = 5;
            this.bottom = 1;
            break; 
        case 6:
            this.middle = 3;
            this.top = 5;
            this.bottom = 0;
            break; 
    }
  }
  drawSkeleton = () => {
      this.paper
          .rect(this.cx + 0, this.cy + 0, this.width, this.height, 10)
          .attr({
              fill: '#fff',
              stroke: 'none'
          });
      // this is for a source part rect
      this.paper
          .rect(this.cx + 0, this.cy + 20, this.width / 10 * 3, this.height - 25)
          .attr({
              fill: '#f2f2f2',
              stroke: this.stroke_color,
          });
      // this is for a main part rect
      this.paper
          .rect(this.cx + this.width / 10 * 3 + 2, this.cy, this.width / 10 * 4, this.height - 5)
          .attr({
              fill: '#deebf7',
              stroke: this.stroke_color
          });
      //  this is for a target part rect
      this.paper
          .rect(this.cx + this.width / 10 * 7 + 4, this.cy + 20, this.width / 10 * 3 - 5, this.height - 25)
          .attr({
              fill: '#f2f2f2',
              stroke: this.stroke_color
          });
  };

  getDeepth = () => {
      var deepth = this.jsonObj.nodes.targets == undefined ? 0 : this.jsonObj.nodes.targets.length;
      if(deepth > 6) {
          alert('Too many targets! Only 6 targets will be appled.');
          deepth = 6;
      }
      return deepth;
      
  }

  drawArrow = (start_x, start_y, arrow_len, arrow_color) => {
      var str_st0 = "M" + start_x + "," + start_y + "L" + (start_x + arrow_len) + "," + start_y;
      this.paper
          .path(str_st0)
          .attr({
              fill: arrow_color,
              stroke: arrow_color,
              'stroke-width': this.arrow_stroke_width
          });
      this.paper
          .path(polygonPath([start_x + arrow_len, start_y - this.arrow_stroke_width, 0, 2 * this.arrow_stroke_width, arrow_len / 6, -this.arrow_stroke_width * 2 / 2]))
          .attr({
              fill: arrow_color,
              stroke: arrow_color,
              "stroke-width": this.arrow_stroke_width
          });
  }

  drawIcon = (start_x, start_y, icon_url) => {
      this.paper
          .rect(start_x, start_y, this.width / 11, this.height / 8)
          .attr({
              fill: 'transparent',
              stroke: this.stroke_color
          });
      this.paper
          .image(icon_url, start_x + (this.width / 11 - this.width / 15) / 2, start_y)
          .attr({
              'width': this.width / 15 + 'px',
              'height': this.width / 15 + 'px'
          });
  }

  drawNode = (start_x, start_y, node, zoom_rate = 1) => {
      var node_width = this.width / 15 * zoom_rate;
      var node_height = this.height / 8 * zoom_rate;
      var bias = (zoom_rate - 1) * this.height / 16;
      start_y = start_y - bias;
      this.paper
          .rect(start_x, start_y, node_width, node_height)
          .attr({
              fill: '#548235',
              stroke: this.stroke_color
          });
      var submitBtn = this.paper
          .rect(start_x + node_width / 16, start_y + node_height - node_height / 9.6, node_width / 8 * 7, node_height / 11 * 2)
          .attr({
              fill: node.button.backgroundColor == undefined ? '#f47926': node.button.backgroundColor,
              stroke: this.stroke_color
          });

      this.paper
          .circle(start_x + node_width / 20 * 19, start_y + node_height / 19 * 1, node_height / 8)
          .attr({
              fill: node.icon.backgroundColor
          });
      this.paper
          .image(node.icon.iconImage == undefined ? node.icon.icon : node.icon.iconImage, start_x + node_width / 20 * 19 - node_height / 8, start_y + node_height / 19 * 1 - node_height / 8)
          .attr({
              'width': node_height / 8 * 2 + 'px',
              'height': node_height / 8 * 2 + 'px'
          });;
      if (node.name != undefined)
          this.paper
          .text(start_x + node_width / 2, start_y + node_height / 7, node.name)
          .attr({
              'font-size': node_width / 10 + 'px',
              fill: 'white'
          });
      var index = 1;
      node.labels.forEach(ele => {
          if (ele.name != 'Date Time') {
              var txt_element = this.paper
                  .text(start_x + node_width / 20, start_y + node_height / 9 * (index + 2), ele.name + ' : ' + ele.value)
                  .attr({
                      'font-size': node_width / 17 + 'px',
                      fill: 'white',
                      'text-anchor': 'start'
                  });
          }
          index++;
      });
      var resubmit_text = this.paper
          .text(start_x + node_width / 2, start_y + node_height - node_height / 9.6 + node_height / 11, node.button.text == undefined ? 'Resubmit': node.button.text)
          .attr({
              'font-size': node_width / 12 + 'px',
              fill: node.button.color == undefined ? 'white': node.button.color
          });
      var button1 = this.paper.set(); 
      button1.push(resubmit_text); 
      button1.push(submitBtn);
      button1.attr({cursor: "pointer"});
      button1.click(function(evt){
          alert(node.button.url);
          
      }); 
  };

  drawTarget = (index, node, type) => {
      var increase_ruler = (this.middle - this.top + index) * (this.height - 20) / 27 * 4;
      this.drawArrow(this.cx + this.width / 15 * 9.28, this.cy + (this.height - 20) / 7 * 3.5 + increase_ruler, this.width / 33, type == 'node' ? this.stroke_color : '#7f6000');
      this.drawIcon(this.cx + this.width / 10.5 * 6.9, this.cy + (this.height - 20) / 7 * 3 + increase_ruler, node.iconImage);
      this.drawArrow(this.cx + this.width * 3 / 4, this.cy + (this.height - 20) / 7 * 3.5 + increase_ruler, this.width / 33, this.stroke_color);
      
      var start_x = this.cx + this.width * 0.8;
      var start_y = this.cy + (this.height - 20) / 7 * 3 + increase_ruler;
      var node_width = this.width / 25 * 3;
      var node_height = (this.height - 20) / 8;
      this.paper
          .rect(start_x, start_y, node_width, node_height)
          .attr({
              fill: '#deebf7',
              stroke: this.stroke_color
          });
      this.paper
          .text(this.cx + this.width * 0.86, this.cy + (this.height - 20) / 7 * 3 + this.height / 15 + increase_ruler, node.server + "\n" + node.protocol)
          .attr({
              'font-size': this.width / 100 + 'px',
              'font-weight': 'bold'
          });

      var submitBtn = this.paper
      .rect(start_x + node_width / 16, start_y + node_height - node_height / 9.6, node_width / 8 * 7, node_height / 11 * 2)
      .attr({
          fill: node.button.backgroundColor == undefined ? '#f47926': node.button.backgroundColor,
          stroke: this.stroke_color
      });

      this.paper
          .circle(start_x + node_width / 20 * 20, start_y + node_height / 19 * 1, node_height / 8)
          .attr({
              fill: node.icon.backgroundColor
          });
      this.paper
          .image(node.icon.iconImage == undefined ? node.icon.icon : node.icon.iconImage, start_x + node_width / 20 * 20 - node_height / 8, start_y + node_height / 19 * 1 - node_height / 8)
          .attr({
              'width': node_height / 8 * 2+ 'px',
              'height': node_height / 8 * 2+ 'px'
          });
      
      var resubmit_text = this.paper
      .text(start_x + node_width / 2, start_y + node_height - node_height / 9.6 + node_height / 11, node.button.text == undefined ? 'Resubmit': node.button.text)
      .attr({
          'font-size': node_width / 12 + 'px',
          fill: node.button.color == undefined ? 'white': node.button.color
      });
      var button1 = this.paper.set(); 
      button1.push(resubmit_text); 
      button1.push(submitBtn);
      button1.attr({cursor: "pointer"});
      button1.click(function(evt){
          alert(node.button.url);
          
      }); 
  };


  drawSource = () => {
      if (this.jsonObj.source == undefined)
          return;
      this.paper
          .rect(this.cx + this.width / 10 * 3 / 20, this.cy + (this.height - 20) / 7 * 3, this.width / 10 * 3 / 10 * 4, (this.height - 20) / 7)
          .attr({
              fill: '#deebf7',
              stroke: this.stroke_color
          });
      this.paper
          .text(this.cx + this.width / 10 * 3 / 20 + this.width / 320 * 19, this.cy + (this.height - 20) / 7 * 3 + this.height / 15, this.jsonObj.source.server + "\n" + this.jsonObj.source.protocol)
          .attr({
              'font-size': this.width / 100 + 'px',
              'font-weight': 'bold'
          });
      this.drawArrow(this.cx + this.width / 10 * 3 / 100 * 48, this.cy + (this.height - 20) / 7 * 3.5, this.width / 10 * 3 / 4, this.stroke_color);
      this.drawIcon(this.cx + this.width / 10 * 3 / 20 * 17, this.cy + (this.height - 20) / 7 * 3, this.jsonObj.source.iconImage);
  };

  drawNodes = () => {
      this.drawArrow(this.width / 20 * 7, this.cy + (this.height - 20) / 7 * 3.5, this.width / 33, this.stroke_color)
      if (this.jsonObj.nodes == undefined || this.jsonObj.nodes.source == undefined) {
          alert('JSON Object Error');
          return;
      }
      var deepth = this.getDeepth();
      this.getPositionIndex(deepth);
      if (deepth <= 1) {
          this.drawNode(this.cx + this.width / 5 * 2, this.cy + (this.height - 20) / 7 * 3, this.jsonObj.nodes.source, 3.1); //3.2
          this.drawTarget(0, this.jsonObj.nodes.targets[0]);
      } else if(deepth > 1){
          this.drawNode(this.cx + this.width / 5 * 2, this.cy + (this.height - 20) / 7 * 3, this.jsonObj.nodes.source);
          var start_x = this.cx + this.width * 48.2 / 100;
          var start_y = this.cy + (this.height - 20) / 7 * 3.5;
          var str_st0 = "M" + start_x + "," + (start_y) + "L" + (this.width / 80 + start_x + 3) + "," + (start_y);
          this.paper
              .path(str_st0)
              .attr({
                  fill: '#7f6000',
                  stroke: '#7f6000',
                  'stroke-width': this.arrow_stroke_width
              });
          str_st0 = "M" + (start_x + this.width / 80) + "," + (start_y - 2) + "L" + (this.width / 80 + start_x) + "," + (start_y - (this.top - this.middle) * (this.height - 20) / 27 * 4 - 3);
          this.paper
              .path(str_st0)
              .attr({
                  fill: '#7f6000',
                  stroke: '#7f6000',
                  'stroke-width': this.arrow_stroke_width
              });
          str_st0 = "M" + (start_x + this.width / 80) + "," + (start_y - 2) + "L" + (this.width / 80 + start_x) + "," + (start_y + (this.middle - this.bottom) * (this.height - 20) / 27 * 4 + 2.5);
          this.paper
              .path(str_st0)
              .attr({
                  fill: '#7f6000',
                  stroke: '#7f6000',
                  'stroke-width': this.arrow_stroke_width
              });
          var temp_json = this.jsonObj.nodes.targets;
          for (var i = 0; i < deepth; i++) {
              if (temp_json[i].type == 'node') {
                  var x_pos = this.cx + this.width / 41 * 22 - this.width / 25;
                  var y_pos = start_y + (this.middle - this.top + i) * (this.height - 20) / 27 * 4;
                  this.drawNode(this.cx + this.width / 41 * 22, this.cy + (this.height - 20) / 7 * 3 + (this.middle - this.top + i) * (this.height - 20) / 27 * 4, this.jsonObj.nodes.targets[i]);
                  this.drawArrow(x_pos, y_pos, this.width / 40, '#7f6000');
              } else if (temp_json[i].type == 'external') {
                  var x_pos = this.cx + this.width / 41 * 22 - this.width / 25;
                  var y_pos = start_y + (this.middle - this.top + i) * (this.height - 20) / 27 * 4;
                  str_st0 = "M" + x_pos + "," + y_pos + "L" + (this.width / 20 * 2.75 + start_x) + "," + y_pos;
                  this.paper
                      .path(str_st0)
                      .attr({
                          fill: '#7f6000',
                          stroke: '#7f6000',
                          'stroke-width': this.arrow_stroke_width
                      });
              }
          }
          this.drawTargets();
      }
  };

  drawTargets = () => {
      var cnt = this.getDeepth();
      var node;
      var temp_json = this.jsonObj.nodes.targets;
      for (var i = 0; i < cnt; i++) {
          if (temp_json[i].type == 'external') {
              node = temp_json[i];
          } else if (temp_json[i].type == 'node') {
              node = temp_json[i].targets[0];
          }
          this.drawTarget(i, node, temp_json[i].type);
      }
  }
}
$(function() {
  var rObj = new JsonConverter("svg", json_str, 1600, 760, 0, 0);
  rObj.drawSkeleton();
  rObj.drawSource();
  rObj.drawNodes();
});