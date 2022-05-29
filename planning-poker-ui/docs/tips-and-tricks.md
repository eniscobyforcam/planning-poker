# Use .env file to configure backend URL in development mode

The URL of the backend endpoint is constructed as relative path in production mode, because the system assumes, the UI is hosted
by the same GO backend as the endpoint.

Whe running in development mode though, our frontend will start a dedicated development web server with a different URL, than the backend.

We can use .env files to have the app connect to an alternative URL in the development mode:

```ts
const getEndpointUrl = () => {
  if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_ENDPOINT_URL) {
    return process.env.REACT_APP_ENDPOINT_URL
  }

  const protocol = window.location.protocol === 'https' ? 'wss' : 'ws'

  return `${protocol}://${window.location.host}/endpoint/`
}
```

We can point our UI to the backend running in Docker on localhost using the folloing **.env.local** file:
```
REACT_APP_ENDPOINT_URL=http://localhost/endpoint/
```

# Conditional rendering in JSX

We can use javascript language features for conditional rendering of information within JSX.

For example the following code makes use of:
* Bool conversion:
    * false, undefined, null => false
    * other => true
* && operator returns the value of the second operand when the expression matches
* React renders nothing for false, null or undefined

```tsx
return (
    <>
      {!name && <Welcome onSetName={setName} />}
    </>
)
```

The unary operator can be used when choosing between two alternatives based on a condition:

```tsx
<TableCell>
    {revealed ? points : votes[person] === '' ? '?' : '✔️'}
</TableCell>
```

# Rendering arrays in JSX

Similar to the conditional rendering we can use the **Array.map** function for rendering array elements.

Note - each element in an array should have a unique key derived from the data.

```tsx
{["0", "0.5", "1", "2", "3", "5", "8", "13", "20", "40", "100", "?", "☕"].map((value) => (
<VotingCard
    key={`Card_${value}`}
    value={value}
    // ...
/>
))}
```

# Fragments

The render function of a React component must return only one element.

Sometimes the component represents a set of siblings such as a list of buttons.

One possibility here is to wrap the returned components into a div:

```tsx
return (
    <div>
        <IconButton size='large' color='inherit' onClick={onNewRound}>
            <Refresh />
        </IconButton>
        <IconButton size='large' color='inherit' onClick={onLeaveRoom}>
            <ExitToApp />
        </IconButton>
    </div>
)
```

This however, will also create a div in the DOM, which may interfere with our CSS rules and is not neccessary.

React has a special component called **Fragment** to work around this. This way the icon buttons are rendered directly in the parent:

```tsx
return (
    <Fragment>
        <IconButton size='large' color='inherit' onClick={onNewRound}>
            <Refresh />
        </IconButton>
        <IconButton size='large' color='inherit' onClick={onLeaveRoom}>
            <ExitToApp />
        </IconButton>
    </Fragment>
)
```

React provides a syntactic sugar for using fragments in form of empty elements:

```tsx
return (
    <>
        <IconButton size='large' color='inherit' onClick={onNewRound}>
            <Refresh />
        </IconButton>
        <IconButton size='large' color='inherit' onClick={onLeaveRoom}>
            <ExitToApp />
        </IconButton>
    </>
)
```


# Material Icons

MUI brings a rich library of [SVG icons](https://mui.com/material-ui/material-icons/#main-content) in form of components. 
These icons are compiled into the JS bundle and cached as part of the whole application.

# Material UI theming

Material UI implements the Material Design theming paradigm.

See https://mui.com/material-ui/customization/theming/

Note - when you don't define a custom theme, a default theme will automatically be in place and can be used for styling components.


# Styled Material UI components

The approach to styling components in MUI has evolved over time. 
The current standard are [styled components](https://mui.com/material-ui/guides/interoperability/#styled-components).

You can derive a CSS-styled component from another component using the following syntax:

```tsx
import {styled} from '@mui/material'

// Centered div
const Window = styled('div')`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`
```

You can access the properties of the component in the template string using following syntax (we directly deconstruct and use the props.theme here):

```tsx
import {styled} from '@mui/material'

const StyledTable = styled(Table)`
  margin: ${({theme}) => theme.spacing(1)};
`
```

# Responsive styling

MUI supports [responsive design](https://mui.com/material-ui/guides/responsive-ui/#main-content) based on media queries.

There are multiple syntactical options, we prefer the use of responsive styling:

```tsx
import {styled} from '@mui/material'

const Title = styled(Typography)`
  display: block;
  ${({theme}) => theme.breakpoints.down('sm')} {
    display: none;
  }
`
```

The **theme.breakpoints.down('sm')** function returns a media query matching all breakpoints below **sm**, which means **xs**. 

This will make the Title disappear on smallest devices (cell phones), but displayed on all other device types.

# Optimization

As explained earlier, a React application is basically a tree-like composution of pure functions calculating the virtual DOM representation of the UI as function of state.

The differences between the previous virtual DOM and the newly calculated virtual DOM are then applied to the DOM of the browser.

When React decides, it needs a new virtual DOM, it always starts the calculation from the root of the application.

React applications tend to be pretty fast even without any optimizations as the major bottleneck, which is the manipulation of the browser DOM, is limited to absolute minimum thanks to the virtual DOM approach.

Nevertherless, some patterns may lead to imperformant applications without further optimization such as:
* Complex applications composed of tons of components
* Expensive calculation of displayed data derived from state such as filtered list displayed in the table

React provides tools to control the calculation of the virtual DOM by making sure components are only re-rendered when state relevant for individual components changes and ignore changes in state, which do not change the component.

It also provides tools to perform expensive calculations only when the input data is changed.

Please note, that all the optimization techniques introduce a light overhead (previous state of props must be remembered) and should not be used as the hammer, which fits on every nail. Optimizing simple calculations and components may actually turn to be more expensive, than not doing so.

# memo

[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) is a higher order component, which can be wrapped around any component to only invoke it's render function when the properties of the component changed.

It basically remembers the properties of the last invocation and compares tmep with the properties of the current invocation and only invokes the render method of the wrapped component if there is a change.

A component wrapped in a memo is usually called a "memoized" component.

The usage is pretty straight-forward:

```tsx
import {memo} from 'react'

const MyComponent = () => {
    return (
        // ...
    )
}

export default memo(MyComponent)
```

An optional comparator can be passed as second parameter in case we don't want the default comparison behaviour:

```tsx
import {memo} from 'react'

const MyComponent = () => {
    return (
        // ...
    )
}

export default memo(MyComponent, (prev, next) => prev.name !== next.name)
```

## useMemo

The [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hook can be used to provide a memoized version of an expensive calculation.

The value **revealed** below will only be recalculated when the **votes** change. The lambda returns true when none of the values of the votes object is equal to ''.

```tsx
import {useMemo} from 'react'

const revealed = useMemo(
() =>
    Object.values(votes).reduce(
    (total, current) => total && current !== '',
    true
    ),
[votes]
)
```

Revealed is also called a **memoized value**.

## useCallback

It is important to know, that when comparing properties to check whether they change, React only performs a shallow comparison.

This way the new virtual DOM can be recalculated quickly without the very expensive deep compares.

This becomes interesting when handling references (objects, functions, lambdas). The shallow compare of two references return true when they reference the same memory.

React relies on the developer to only change references when the referenced data change and keep them stable otherwise to get optimal performance.

This is problematic with callbacks implemented as lambdas. Let's consider the following code:

```tsx
const Parent = () => {
    const [counter, setCounter] = useState(0)

    const handleAction = (name) => {
        setCounter(counter + 1)
        console.log(`Counter incremented by ${name}`)
    }

    return (
        <>
            <Child name="A" onAction={handleAction}/>
            <Child name="B" onAction={handleAction}/>
        </>
    )
}
```

The **counter** is a value, the **setCounter** is a function reference, however the **useState** hook is implemented in a way, that it always returns the same reference.

The **handleAction** callback, however is a lambda object created during each render of the parent component. Passing this callback to the child component renders any attempted memoization of the child useless.

This is where the **useCallback** hook comes in handy. It can be used to create a memoized version of a callback. It keeps the returned reference stable unless any of the values passed in the array as second parameter change. To avoid bugs caused by forgetting to include values caught by the lambda expression, the React linter requires us to mention all the caught values. Therefore we have to include the **setCounter** callback even though we know, it is stable.

This code effectively only creates a new reference every time the **counter** variable is changed and keeps the callback stable otherwise.

```tsx
const Parent = () => {
    const [counter, setCounter] = useState(0)

    const handleAction = useCallback(
        (name) => {
        setCounter(counter + 1)
        console.log(`Counter incremented by ${name}`)
    },
    [counter, setCounter]
    )

    return (
        <>
            <Child name="A" onAction={handleAction}/>
            <Child name="B" onAction={handleAction}/>
        </>
    )
}
```
