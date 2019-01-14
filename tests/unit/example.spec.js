import {createLocalVue, mount} from '@vue/test-utils'
import InputAmount from '../../src/components/InputAmount.vue'
import VeeValidate from "vee-validate";

describe('HelloWorld.vue', () => {

    it('renders with the initial properties', () => {

        // Install the vee-validate plugin.
        // https://github.com/baianat/vee-validate/blob/master/tests/unit/component.js
        const Vue = createLocalVue();
        Vue.use(VeeValidate /* , { inject: false } */);

        const wrapper = mount(InputAmount, {
                localVue: Vue,
                sync: false,
                propsData: {
                    amount: 100,
                    currency: 'USD',
                    direction: 'TOBTC'
                }
            }
        );

        const currencyText = wrapper.find('.input-group-prepend');
        const textInput = wrapper.find('input[type="text"]');

        expect(currencyText.text().trim()).toBe('$');
        expect(textInput.element.value).toBe('100');
    });


    it('emits the value the user enters', () => {

        const Vue = createLocalVue();
        Vue.use(VeeValidate);

        const wrapper = mount(InputAmount, {
                localVue: Vue,
                sync: false,
                propsData: {
                    amount: 100,
                    currency: 'USD',
                    direction: 'TOBTC'
                }
            }
        );

        const textInput = wrapper.find('input[type="text"]');
        textInput.setValue('12');
        expect(wrapper.emitted()['update:amount'][0]).toEqual([12]);
        expect(textInput.element.value).toBe('12');
    })
});
