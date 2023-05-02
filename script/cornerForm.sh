WIM_ID=$(wmctrl -l | grep -wE 'chang vue-timer' | cut -f1 -d' ')
echo $WIM_ID
wmctrl -i -r $WIM_ID -e 0,1570,840,460,300
