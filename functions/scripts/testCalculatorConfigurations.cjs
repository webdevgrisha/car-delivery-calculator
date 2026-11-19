const projectId = 'liberty-cars-calculator';
const functionsBase = `http://127.0.0.1:5101/${projectId}/us-central1`;

async function call(name, data, token) {
  const response = await fetch(`${functionsBase}/${name}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({data}),
  });
  const body = await response.json();
  if (!response.ok || body.error || body.result?.error) {
    throw new Error(`${name} failed: ${JSON.stringify(body)}`);
  }
  return body.result;
}

async function main() {
  const authResponse = await fetch(
    'http://127.0.0.1:9199/identitytoolkit.googleapis.com/v1/' +
      'accounts:signInWithPassword?key=fake',
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: 'admin@local.test',
        password: 'admin123',
        returnSecureToken: true,
      }),
    },
  );
  const auth = await authResponse.json();
  if (!auth.idToken) {
    throw new Error(`Authentication failed: ${JSON.stringify(auth)}`);
  }

  const before = await call('getCalculatorConfigurations', {}, auth.idToken);
  const name = `Integration test ${Date.now()}`;
  const created = await call('createCalculatorConfiguration', {
    name,
    sourceConfigurationId: 'default',
  }, auth.idToken);
  const after = await call('getCalculatorConfigurations', {}, auth.idToken);
  const settings = await call('getCalculatorSettingsData', {
    tableName: 'auction_and_shipping',
    configurationId: created.configuration.id,
  }, auth.idToken);
  const calculation = await call('calculateRowsData', {
    configurationId: created.configuration.id,
    selectedAdditionalServices: [],
    variables: {
      carPrice: '1000',
      engineSize: 'Less 2L',
      degreeOfDamage: 'None',
      costInPL: '0',
      location: 'Chicago, IL - Copart',
      customsCosts: '100',
      repairCosts: '500',
      carSize: 'Sedan',
    },
  }, auth.idToken);

  if (after.configurations.length !== before.configurations.length + 1) {
    throw new Error('Created configuration is missing from the list');
  }
  if (!settings.tableRows?.length) {
    throw new Error('Default calculator settings were not copied');
  }
  if (!Array.isArray(calculation) || calculation.length !== 4) {
    throw new Error('Calculation did not use the copied configuration');
  }

  console.log(JSON.stringify({
    created: created.configuration,
    copiedRows: settings.tableRows.length,
    calculatedSections: calculation.length,
  }));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
