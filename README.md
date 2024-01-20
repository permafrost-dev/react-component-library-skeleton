# rewire: React + Livewire

---

Craft Laravel Livewire components using React.

## Installation

```bash
npm install @permafrost-dev/rewire

```

## Writing Components

`rewire` components are written using React, and are intended to be used with Laravel Livewire.  The PHP code is exactly the same as a normal Livewire component, but the view is replaced with a single div containing a `rewire-component` directive.;

DemoComponent.php:

```php
<?php

namespace App\Livewire;

use Livewire\Component;

class DemoComponent extends Component
{
    public $ts = 0;
    public $counter = 0;

    public function render()
    {
        return view('livewire.demo-component');
    }

    public function increment()
    {
        $this->ts = now()->timestamp;
        $this->counter = $this->counter + 1;
    }
}
```

The livewire blade template, `demo-component.blade.php`:

```html
<div rewire-component="DemoReactComponent"></div>
```

Assuming your javascript entry point is; `resources/js/main.tsx`:

```typescript
import ReactDOM from 'react-dom/client';
import { rewire } from '@permafrost-dev/rewire';
import DemoReactComponent from "@/components/DemoReactComponent";

window.Livewire.start();

rewire()
    .initialize(ReactDOM.createRoot, ReactDOM.render)
    .mountComponentMap({
        DemoReactComponent: () => <DemoReactComponent />,
    });
```

And the React component:

```typescript
import { useRef } from "react";
import { useLivewireComponent } from "@permafrost-dev/rewire";

export default function DemoReactComponent(props) {
    const elementRef = useRef<HTMLDivElement|null>(null);
    const { $props } = useLivewireComponent(elementRef);

    return (
        <div ref={elementRef} className="w-1/3 m-2 p-2 bg-gray-200">
            <div className="w-full block">timestamp: {$props?.ts }</div>
            <div className="w-full block">counter: {$props?.counter}</div>

            <button className="bg-navy-400 p-3 text-white" wire:click="increment">
                increment
            </button>
        </div>
    );
}
```

Finally, use your Livewire component as normal in blade templates:

```html
    <body>;
        <livewire:demo-component />
    </body>
```

## Testing

`package-skeleton` uses Jest for unit tests. To run the test; suite:

`npm run test`

---

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

-   [Patrick Organ](https://github.com/permafrost-dev)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
