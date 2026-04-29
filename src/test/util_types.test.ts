import { describe, expectTypeOf, it } from 'vitest';
import { ExpectTypeOf } from 'vitest';
import type { DeepReadonly, PickedByType, EventHandlers} from '../main/util_types'

describe('DeepReadOnly util', () => {
    it('Should make simple properties readonly', () => {
        type Input = { 
            a: string;
            b: number;
        };

        type Result = DeepReadonly<Input>;

        expectTypeOf<Result>().toEqualTypeOf<{
            readonly a: string;
            readonly b: number;
        }>();
    });

    it('Should make nested properties readonly', () => {
        type Input = {
            name: string;
            address: {
                city: string;
                street: string;
            };
        };

        type Result = DeepReadonly<Input>;

        expectTypeOf<Result>().toEqualTypeOf<{
            readonly name: string;
            readonly address: {
                readonly city: string;
                readonly street: string;
            };
        }>();
    });

    it('Should reach deeply nested properties readonly', () => {
        type Input = {
            level1: {
                level2: {
                    level3: {
                        level4: {
                            level5: {
                                value: boolean;
                            };
                        };
                    };
                };
            };
        };

        type Result = DeepReadonly<Input>;

        expectTypeOf<Result>().toEqualTypeOf<{
            readonly level1: {
                readonly level2: {
                    readonly level3: {
                        readonly level4: {
                            readonly level5: {
                                readonly value: boolean;
                            };
                        };
                    };
                };
            };
        }>();
    });

    it('Should work with arrays', () => {
        type Input = {
            items: string[];
            location: {
                rows: number[];
                columns: number[];
            };
        };

        type Result = DeepReadonly<Input>;

        expectTypeOf<Result>().toEqualTypeOf<{
            readonly items: readonly string[];
            readonly location: {
                readonly rows: readonly number[];
                readonly columns: readonly number[];
            };
        }>();
    });
});

describe('PickedByType util', () => {
    it('Should pick only string properties', () => {
        interface Example {
            name: string;
            age: number;
            email: string;
            isActive: boolean;
        };

        type Result = PickedByType<Example, string>;

        expectTypeOf<Result>().toEqualTypeOf<{
            name: string;
            email: string;
        }>();
    });

    it('Should pick only number properties', () => {
        interface Example {
            name: string;
            age: number;
            isActive: boolean;
            isDeleted: boolean;
        };

        type Result = PickedByType<Example, boolean>;

        expectTypeOf<Result>().toEqualTypeOf<{
            isActive: boolean;
            isDeleted: boolean;
        }>();
    });

    it('Should return empty property if no match found', () => {
        interface Example {
            name: string;
            age: number;
        };

        type Result = PickedByType<Example, boolean>;

        expectTypeOf<Result>().toEqualTypeOf<{}>();
    });
});

describe('EventHandlers util', () => {
    it('should generate handlers for simple events', () => {
        interface Events {
            click: MouseEvent;
            focus: FocusEvent;
        };

        type Result = EventHandlers<Events>;
        
        expectTypeOf<Result>().toEqualTypeOf<{
            onClick: (event: MouseEvent) => void;
            onFocus: (event: FocusEvent) => void;
        }>();
    });

    it('Should capitalize event names properly', () => {
        interface Events {
            change: Event;
            submit: SubmitEvent;
        };

        type Result = EventHandlers<Events>;
        
        expectTypeOf<Result>().toEqualTypeOf<{
            onChange: (event: Event) => void;
            onSubmit: (event: SubmitEvent) => void;
        }>();
    });

    it('should work with custom event types', () => {
        interface CustomEvents {
            data: { value: string };
            error: { message: string; code: number };
        }

        type Result = EventHandlers<CustomEvents>;

        expectTypeOf<Result>().toEqualTypeOf<{
            onData: (event: { value: string }) => void;
            onError: (event: { message: string; code: number }) => void;
        }>();
    });
})