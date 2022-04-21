<script>
    export let size = 200;
    export let percent1 = 0;
    export let percent2 = 0;
    export let percent3 = 0;
    export let bgColor = '#fafafa';
    export let fgColor1
    export let fgColor2
    export let fgColor3
    export let imagelink
    
    $: viewBox = `0 0 ${size} ${size}`;
    
    $: radius = size / 2;
    $: halfCircumference = Math.PI * radius;

    $: pieSize1 = halfCircumference * (percent1 / 100);
    $: pieSize2 = halfCircumference * (percent2 / 100);
    $: pieSize3 = halfCircumference * (percent3 / 100);
    
    $: dashArray1 = `0 ${halfCircumference - pieSize1} ${pieSize1}`;
    $: dashArray2 = `0 ${halfCircumference - pieSize2} ${pieSize2}`;
    $: dashArray3 = `0 ${halfCircumference - pieSize3} ${pieSize3}`;
  </script>
  
  <svg width={size} height={size} {viewBox}>
    <circle r={radius} cx={radius} cy={radius} fill={bgColor} />
    <circle
      r={radius / 2}
      cx={radius}
      cy={radius}
      fill={bgColor}
      stroke={fgColor1}
      stroke-width={radius}
      stroke-dasharray={dashArray1}
    />
    <circle
      r={radius / 2}
      cx={radius}
      cy={radius}
      fill={bgColor}
      stroke={fgColor2}
      stroke-width={radius}
      stroke-dasharray={dashArray2}
    />
    <circle
      r={radius / 2}
      cx={radius}
      cy={radius}
      fill={bgColor}
      stroke={fgColor3}
      stroke-width={radius}
      stroke-dasharray={dashArray3}
    />
    <circle
      r={radius / 1.3}
      cx={radius}
      cy={radius}
      fill={bgColor}
      stroke-width={radius}
    />
    <image
        id='photo'
        xlink:href={imagelink}
        width={size}
        height={size}
        x=0
        y=0
        clip-path="url(#myClip)"
    />
    <defs>
        <clipPath id="myClip">
            <circle
            cx={radius}
            cy={radius}
            r={radius/1.4}
            />
        </clipPath>
    </defs>
  </svg>