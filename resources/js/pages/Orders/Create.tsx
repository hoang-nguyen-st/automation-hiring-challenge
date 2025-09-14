import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';

interface Props {
    errors?: {
        name?: string;
        email?: string;
        domains?: string;
    };
}

export default function Create({ errors }: Props) {
    const [bringDomains, setBringDomains] = useState<string[]>([]);
    const [buyDomains, setBuyDomains] = useState<string[]>([]);
    const [bringDomainInput, setBringDomainInput] = useState('');
    const [buyDomainInput, setBuyDomainInput] = useState('');
    const [bringDomainError, setBringDomainError] = useState('');
    const [buyDomainError, setBuyDomainError] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        bring_domains: [] as string[],
        buy_domains: [] as string[]
    });

    const validateDomain = (domain: string): boolean => {
        const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
        return domainRegex.test(domain.trim());
    };

    // Generate randomized IDs and placeholders for Buy Domains only (to make automation harder)
    const randomizedBuyContent = useMemo(() => {
        const buyIdVariations = [
            'buy-domains-section',
            'section-domains-buy',
            'domains-buy-container',
            'buy-section-domains',
            'container-buy-domains',
            'domains-to-buy-section',
            'buy-domains-area',
            'section-buy-domain-list'
        ];

        const buyPlaceholderVariations = [
            'Enter domain to buy',
            'Add domain to purchase',
            'Domain to buy (e.g., example.com)',
            'Enter new domain',
            'Add domain to register',
            'Type domain to purchase',
            'Domain name to buy',
            'Input domain to acquire'
        ];

        const buyIndex = Math.floor(Math.random() * buyIdVariations.length);
        const buyPlaceholderIndex = Math.floor(Math.random() * buyPlaceholderVariations.length);

        return {
            buyId: buyIdVariations[buyIndex],
            buyPlaceholder: buyPlaceholderVariations[buyPlaceholderIndex]
        };
    }, []);

    // Check if form is valid
    const isFormValid = useMemo(() => {
        const hasValidName = data.name.trim().length > 0;
        const hasValidEmail = data.email.trim().length > 0 && data.email.includes('@');
        const hasAtLeastOneDomain = bringDomains.length > 0 || buyDomains.length > 0;

        return hasValidName && hasValidEmail && hasAtLeastOneDomain;
    }, [data.name, data.email, bringDomains.length, buyDomains.length]);

    const addBringDomain = () => {
        const trimmedInput = bringDomainInput.trim();
        if (!trimmedInput) {
            setBringDomainError('Please enter a domain.');
            return;
        }
        if (!validateDomain(trimmedInput)) {
            setBringDomainError('Please enter a valid domain (e.g., example.com).');
            return;
        }
        if (bringDomains.includes(trimmedInput)) {
            setBringDomainError('This domain is already added.');
            return;
        }
        const newDomains = [...bringDomains, trimmedInput];
        setBringDomains(newDomains);
        setData('bring_domains', newDomains);
        setBringDomainInput('');
        setBringDomainError('');
    };

    const addBuyDomain = () => {
        const trimmedInput = buyDomainInput.trim();
        if (!trimmedInput) {
            setBuyDomainError('Please enter a domain.');
            return;
        }
        if (!validateDomain(trimmedInput)) {
            setBuyDomainError('Please enter a valid domain (e.g., example.com).');
            return;
        }
        if (buyDomains.includes(trimmedInput)) {
            setBuyDomainError('This domain is already added.');
            return;
        }
        const newDomains = [...buyDomains, trimmedInput];
        setBuyDomains(newDomains);
        setData('buy_domains', newDomains);
        setBuyDomainInput('');
        setBuyDomainError('');
    };

    const removeBringDomain = (index: number) => {
        const newDomains = bringDomains.filter((_, i) => i !== index);
        setBringDomains(newDomains);
        setData('bring_domains', newDomains);
    };

    const removeBuyDomain = (index: number) => {
        const newDomains = buyDomains.filter((_, i) => i !== index);
        setBuyDomains(newDomains);
        setData('buy_domains', newDomains);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        // Start validation animation
        setIsValidating(true);

        // Show validation for 5 seconds, then submit
        setIsValidating(false);
        post('/order');
    };

    return (
        <>
            <Head title="Create Order" />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-center mb-8">Create Order</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Customer Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Customer</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="customer_name"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors?.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="customer_email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors?.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Domains Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Domains</h2>
                                {errors?.domains && (
                                    <p className="text-red-500 text-sm mb-4">{errors.domains}</p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Bring Domains */}
                                    <div id="bring-domains-section">
                                        <h3 className="text-lg font-medium mb-3">Bring Domains</h3>
                                        <div className="space-y-2 mb-3">
                                            {bringDomains.map((domain, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                    <span>{domain}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBringDomain(index)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                id="bring-domain-input"
                                                name="bring_domain_input"
                                                value={bringDomainInput}
                                                onChange={(e) => {
                                                    setBringDomainInput(e.target.value);
                                                    if (bringDomainError) setBringDomainError('');
                                                }}
                                                placeholder="Enter domain to bring"
                                                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${bringDomainError
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                    }`}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBringDomain())}
                                            />
                                            <button
                                                type="button"
                                                id="bring-domain-add-btn"
                                                onClick={addBringDomain}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {bringDomainError && (
                                            <p className="text-red-500 text-sm mt-1">{bringDomainError}</p>
                                        )}
                                    </div>

                                    {/* Buy Domains */}
                                    <div id={randomizedBuyContent.buyId}>
                                        <h3 className="text-lg font-medium mb-3">Buy Domains</h3>
                                        <div className="space-y-2 mb-3">
                                            {buyDomains.map((domain, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                    <span>{domain}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBuyDomain(index)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                id="buy-domain-input"
                                                name="buy_domain_input"
                                                type="text"
                                                value={buyDomainInput}
                                                onChange={(e) => {
                                                    setBuyDomainInput(e.target.value);
                                                    if (buyDomainError) setBuyDomainError('');
                                                }}
                                                placeholder={randomizedBuyContent.buyPlaceholder}
                                                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${buyDomainError
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                    }`}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBuyDomain())}
                                            />
                                            <button
                                                type="button"
                                                id="buy-domain-add-btn"
                                                onClick={addBuyDomain}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {buyDomainError && (
                                            <p className="text-red-500 text-sm mt-1">{buyDomainError}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    id="order-submit-btn"
                                    name="submit_order"
                                    disabled={!isFormValid || isValidating || processing}
                                    className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Creating Order...' :
                                        isValidating ? 'Validating...' :
                                            'Order Mailboxes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
