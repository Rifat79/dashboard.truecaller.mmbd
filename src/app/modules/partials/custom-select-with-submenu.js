
import Select from "react-select";

export default function SelectSubmenu ({options = [], value = {}, setModel={}}) {
  return (
    <Select
      // components={{GroupHeading: () => <div onClick={() => console.log('i am a group and i am clickable .. yay!')}>My Group Heading</div>}}
      onChange={(option) => {
        console.log(option)
        return setModel(option)
      }}
      closeMenuOnSelect={true}
      options={options}
      value={value}
      tabSelectsValue={false}
      backspaceRemovesValue={false}
          // components={{ DropdownIndicator, IndicatorSeparator: null }}
          // controlShouldRenderValue={false}
          // hideSelectedOptions={false}
          // isClearable={false}
          captureMenuScroll 

    />
  )
}
