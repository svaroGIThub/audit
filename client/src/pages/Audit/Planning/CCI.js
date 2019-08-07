import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import API from "../../../utils/API";

class CCI extends Component {
  state = {
    loggedUser: null,
    selectedAudit: null
  };

  // Loads all clients and sets them to this.state.clients
  loadSelectedAudit = id => {
    API.getSelectedAudit(id)
      .then(res => {
        this.setState({ selectedAudit: res.data });
      })
      .catch(err => console.log(err));
  };

  // authenticates user and load his/her audits
  authUserAndSelectedAudit = () => {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            const id = this.props.routeProps.match.params.id;
            this.loadSelectedAudit(id);
          });
        })
        .catch(err => console.log(err));
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            const id = this.props.routeProps.match.params.id;
            this.loadSelectedAudit(id);
          });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.authUserAndSelectedAudit();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser || !this.state.selectedAudit) {
      return <MySpinner />;
    }

    // there is user data
    return (
      <Layout
        userProps={{
          user:
            this.state.loggedUser.firstName +
            " " +
            this.state.loggedUser.lastName,
          role: this.state.loggedUser.role
        }}
        menuProps={[
          { text: "Tablero", link: "/dashboard" },
          { text: "Auditorías", link: "/audits" },
          { text: "Clientes", link: "/clients" }
        ]}
        phasesProps={[
          {
            text: "Plan",
            link: "/audits/workplan/" + this.state.selectedAudit.id
          },
          {
            text: "Planeación",
            link: "/audits/planning/" + this.state.selectedAudit.id
          },
          {
            text: "Programación",
            link: "/audits/fieldwork/" + this.state.selectedAudit.id
          },
          {
            text: "Ejecución",
            link: "/audits/exection/" + this.state.selectedAudit.id
          }
        ]}
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Auditorías", link: "/audits" },
            {
              key: "2",
              page:
                this.state.selectedAudit.clientAcronym +
                " " +
                this.state.selectedAudit.year,
              link: "/audits/workplan/" + this.state.selectedAudit.id
            },
            {
              key: "3",
              page: "Planeación",
              link: "/audits/planning/" + this.state.selectedAudit.id
            },
            {
              key: "4",
              page: "Cuestionario de Control Interno",
              link: "nolink"
            }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201585.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">Cuestionario de Control Interno</h2>
        </div>

        {/* page content */}
        <Form>
          <Form.Text className="h4 mb-4">1. Entorno de Control</Form.Text>

          <Form.Text className="lead mb-2">1.1 Valores Éticos</Form.Text>

          <Form.Group>
            <Form.Label>
              1. ¿La Entidad cuenta con un Código de Ética y un Código de
              Conducta, que delimite la actuación ética que deben observar los
              servidores públicos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              2. ¿La Entidad cuenta con Reglamento Interior y está publicado en
              Gaceta Oficial? Especificar que publicación.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              3. ¿Qué actividades de control se han establecido para promover y
              fomentar un ambiente donde exista una conducta ética en el
              personal de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              4. ¿Cómo se mide el nivel de competencia del personal para
              garantizar que cuenten con los conocimientos y habilidades
              necesarias para llevar a cabo las tareas asignadas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              5. ¿Se tienen implementados mecanismos para captar denuncias por
              actos contrarios a la ética realizados por funcionarios públicos
              de la Entidad? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            1.2 Estructura Organizacional
          </Form.Text>

          <Form.Group>
            <Form.Label>
              6. ¿Qué actividades de control realiza la Administración de la
              Entidad para garantizar una estructura organizacional alineada con
              los objetivos de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              7. ¿Se han efectuado cambios a la estructura administrativa?
              ¿Quién los autorizó? y ¿A partir de cuándo?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              8. ¿Qué actividades de control se realizan para que la estructura
              organizacional defina claramente la autoridad y responsabilidad de
              los servidores públicos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              9. ¿La estructura organizacional cuenta con actividades de control
              que evitan que en dos o más personas recaiga la mayoría de la
              autoridad y responsabilidad en el ejercicio de los recursos?
              Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              10. ¿Qué actividades de control utiliza el Área de Recursos
              Humanos, para que el programa de capacitación este dirigido a
              promover las capacidades y atributos del personal en el adecuado
              cumplimiento de sus funciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              11. ¿Los Manuales de Organización y de Procedimientos están
              elaborados conforme a la estructura organizacional vigente, a las
              atribuciones y responsabilidades del personal? Especificar que
              otro tipo de manuales existen y quien los autoriza.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              12. ¿Se cuenta con un catálogo de cuentas y manual o guía
              contabilizadora para el registro de las operaciones? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            1.3 Asignación de Autoridad y Responsabilidad
          </Form.Text>

          <Form.Group>
            <Form.Label>
              13. ¿Cómo se cerciora que las actividades que desarrolla el
              personal a su cargo, están alineadas a las descripciones de
              puestos y en su caso se especifican las responsabilidades de su
              personal en sus ámbitos de actuación?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="h4">
            2. Proceso de Valoración de Riesgos
          </Form.Text>

          <hr />

          <Form.Text className="lead mb-2">
            2.1 Cumplimiento de Metas y Objetivos
          </Form.Text>

          <Form.Group>
            <Form.Label>
              14. ¿Qué actividades de control utiliza la Administración de la
              Entidad para que la estructura de organización permita
              identificar, analizar y administrar los principales riesgos
              inherentes a la asignación de autoridad y responsabilidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              15. ¿Existe un área o personal dedicado a la elaboración del
              Programa Operativo Anual y del Programa Anual de Indicadores?
              Mencionar el área y el responsable.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              16. ¿Con base en que establecen los objetivos del Programa
              Operativo Anual o Programa Anual de Indicadores?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              17. ¿Los objetivos del Programa Operativo Anual son cuantificados
              en términos monetarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              18. ¿Qué actividades de control se han establecido para medir el
              cumplimiento de los objetivos de la Entidad?{" "}
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              19. ¿Existe un comité o personal dedicado a realizar la
              metodología para la evaluación de riesgos desde su identificación
              hasta su seguimiento? Mencionar el nombre del comité o
              responsables.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">2.2 Cuenta Pública</Form.Text>

          <Form.Group>
            <Form.Label>
              20. ¿Se envió la información financiera que integra la cuenta
              pública dentro de los términos establecidos por la instancia
              correspondiente?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">2.3 Situación Jurídica</Form.Text>

          <Form.Group>
            <Form.Label>
              21. ¿Existe un área o personal encargado de mantener actualizado a
              la Entidad con relación a Leyes, Reglamentos, Acuerdos, Dictámenes
              que emitan los Congresos Federal y Estatal u otras Instancias de
              Gobierno?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              22. ¿Cuáles son las actividades de control que se desarrollan para
              garantizar que los funcionarios públicos responsables conozcan
              sobre la normatividad aplicable para el ejercicio así como las
              reformas que surjan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              23. ¿Existen juicios pendientes de resolución? En caso afirmativo,
              señalar los juicios existentes, su cuantificación en términos
              monetarios y manifestar si están registrados contablemente.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              24. ¿Se mantiene un archivo o registro en donde consten todos los
              datos relativos a: Juicios, contratos, convenios, opiniones y
              compromisos de los que puedan derivarse obligaciones pecuniarias,
              poderes otorgados, cuentas por cobrar entregadas al cobro a los
              abogados? ¿Quién es el responsable de este resguardo?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              25. ¿Existen denuncias en contra de la Entidad de alguno de sus
              miembros por las funciones que realiza o realizó? En caso
              afirmativo, señalar los funcionarios o exfuncionarios
              participantes.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              26. ¿Existen denuncias realizadas por la Entidad en contra de
              funcionarios o terceros que hayan tenido una relación con el
              mismo? En caso afirmativo, describir brevemente su situación
              legal.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              27. ¿Existen políticas de control para la celebración de contratos
              por la Entidad? Mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              28. ¿Cuál es la periodicidad con la que se celebran las sesiones
              del órgano de gobierno de la Entidad o su equivalente y cuántas
              celebró en el ejercicio?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="h4">3. Sistemas de Información</Form.Text>

          <hr />

          <Form.Group>
            <Form.Label>
              29. Mencionar que tipo de comunicación (formal e Informal) es
              utilizada dentro de la Entidad y señale ejemplos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              30. ¿Qué actividades de control utiliza para comunicar al personal
              las diversas problemáticas que le son manifestadas y cómo
              retroalimenta las posibles soluciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              31. ¿Cómo considera que son los canales de comunicación
              existentes? ¿Por qué?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              32. ¿Cómo calificaría el nivel de comunicación existente entre el
              personal de mando y el personal operativo en relación a la
              importancia que tiene el control para el mejoramiento de las
              actividades cotidianas y manifieste por qué?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              33. ¿Qué actividades de control se han establecido para contar con
              una comunicación efectiva entre su personal y las autoridades
              superiores a las que se debe de informar sobre el ejercicio de los
              recursos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              34. ¿Qué medidas o mecanismos se tienen implementados para la
              recuperación de datos (hardware y software) en caso de desastres o
              caso fortuito?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="h4">
            4. Actividades de Control relevantes para la Auditoría
          </Form.Text>

          <hr />

          <Form.Text className="lead mb-2">
            4.1 Efectivo: Caja y Bancos
          </Form.Text>

          <Form.Group>
            <Form.Label>
              35. ¿Qué actividades de control se tienen implementadas para la
              emisión de cheques?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              36. ¿Cuántas cuentas bancarias se tienen aperturadas y con qué
              institución bancaria?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              37. ¿Con qué periodicidad se realizan las conciliaciones
              bancarias?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              38. ¿Cuánto tiempo tardan en cancelar las partidas en
              conciliación? Especificar el procedimiento.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              39. ¿El efectivo estuvo sujeto a alguna restricción de tipo legal
              o económico?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              40. ¿La Entidad cuenta con fondos fijos o revolventes? En caso
              afirmativo, indicar el número, nombre de quién se le asignó y el
              monto de cada uno de ellos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              41. ¿Con qué periodicidad se cancelan los fondos fijos o
              revolventes?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              42. ¿Qué medidas de control se tienen para el manejo de los fondos
              fijos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              43. ¿La Entidad cuenta con inversiones en valores, cuentas
              bancarias productivas o inversión en mesa de dinero? Enlistar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              44. ¿Qué actividades de control se tienen para el manejo de los
              intereses generados por las inversiones en valores, cuentas
              bancarias productivas o inversiones en mesa de dinero?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.2 Anticipos</Form.Text>

          <Form.Group>
            <Form.Label>
              45. ¿Qué controles se tiene para la amortización de los anticipos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.3 Cuentas por cobrar o Deudores diversos
          </Form.Text>

          <Form.Group>
            <Form.Label>
              46. ¿Se tiene un control para la verificación de la antigüedad de
              los saldos al cierre del ejercicio de gastos por comprobar,
              viáticos, deudores diversos y de las demás cuentas por cobrar para
              su cobro o cancelación? Mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              47. ¿Se cuenta con políticas y procedimientos para la concesión de
              préstamos a empleados? Señalar brevemente, el procedimiento y el
              responsable de autorizarlos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              48. ¿Se otorgan anticipos de sueldos al personal? Explicar el
              procedimiento de cobro.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              49. ¿Se lleva a cabo la depuración de saldos de cuentas por cobrar
              de acuerdo con su antigüedad de saldos, importancia relativa,
              incobrabilidad o errores de registro contables? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              50. ¿Quién autoriza las depuraciones y con que periodicidad se
              realizan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.4 Inventarios o Almacén</Form.Text>

          <Form.Group>
            <Form.Label>
              51. ¿Cuál es el área encargada del control, manejo y resguardo de
              los inventarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              52. ¿Con qué periodicidad se realizan los inventarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              53. ¿Cuál es el método de valuación del inventario utilizado por
              la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.5 Activo Fijo</Form.Text>

          <Form.Group>
            <Form.Label>
              54. ¿Dónde resguardan la documentación que ampara la propiedad de
              los bienes muebles o inmuebles de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              55. ¿Qué bienes muebles e inmuebles se tienen asegurados y dónde
              se resguardan las pólizas de seguro? ¿Cómo se determina que bienes
              deben ser asegurados?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              56. ¿Cuál es el método de registro de los bienes muebles e
              inmuebles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              57. ¿Cuál es el procedimiento para dar de baja los bienes?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              58. ¿Cuántos bienes se dieron de baja en el ejercicio en revisión?
              Especificar concepto, motivo y el monto.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              59. ¿Existen bienes muebles e inmuebles que estén en comodato y
              quién resguarda la documentación correspondiente?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              60. ¿Qué medidas de control se han implementado para el control de
              los bienes muebles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              61. ¿Con qué periodicidad se practica el inventario de bienes?
              ¿Dónde se plasman los resultados del mismo? y ¿A quién se reportan
              los resultados?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              62. ¿De qué forma evitan las diferencias entre los inventarios de
              los bienes y los registros contables?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.6 Cuentas por Pagar</Form.Text>

          <Form.Group>
            <Form.Label>
              63. ¿Cuáles son las cuentas por pagar que tienen mayor antigüedad?
              Especifique la antigüedad y la causa.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              64. ¿Se realiza la provisión de las cuentas por pagar? ¿Cuáles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              65. ¿Qué controles existen en el manejo de los documentos
              pendientes de pago?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              66. ¿Se otorgaron o recibieron empréstitos durante el ejercicio?
              Señalar monto, fecha y concepto
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              67. ¿Se lleva a cabo la depuración de saldos de cuentas por pagar
              de acuerdo con su antigüedad de saldos, improcedencia o errores de
              registro contable? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              68. ¿Quién autoriza las depuraciones y con que periodicidad se
              realizan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.7 Patrimonio</Form.Text>

          <Form.Group>
            <Form.Label>
              69. ¿Se registraron las variaciones del patrimonio en el
              ejercicio? En caso de ser afirmativa la respuesta, especificar las
              variaciones.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.8 Ingresos</Form.Text>

          <Form.Group>
            <Form.Label>
              70. ¿Se tienen registrados los ingresos de acuerdo a lo
              establecido en los Postulados Básicos de Contabilidad
              Gubernamental?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              71. ¿Cuáles son las cuentas bancarias destinadas para el manejo de
              los ingresos?{" "}
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.9 Ingresos Propios</Form.Text>

          <Form.Group>
            <Form.Label>
              72. ¿Cuáles son los procedimientos de cobro establecidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              73. ¿Quién aprueba en su caso, el tipo y el monto de las tarifas
              de los ingresos propios? Mencionar los mecanismos implementados
              para el control de los recibos expedidos por estos ingresos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.10 Recursos Reasignados, Programas Especiales y Otros Recursos
            Federales
          </Form.Text>

          <Form.Group>
            <Form.Label>
              74. ¿Se ejercieron recursos de convenios celebrados con
              anterioridad al año que se revisa? En caso afirmativo, señalar el
              nombre y año de su celebración, así como el tipo de convenio.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              75. ¿La ejecución de los recursos se efectuó de conformidad con el
              objetivo del convenio?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              76. ¿Se ejerció la totalidad de los recursos reasignados?
              Mencionar el monto autorizado y el monto ejercido.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              77. ¿Cuál fue el porcentaje de los recursos ejercidos respecto al
              monto total de los recursos convenidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              78. ¿La entidad ejerció recursos cuya normativa establezca que se
              deben elaborar libros blancos? En caso afirmativo, mencione los
              libros blancos que se realizaron.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.11 Donaciones o Subsidios de terceros
          </Form.Text>

          <Form.Group>
            <Form.Label>
              79. Señalar los mecanismos implementados para el control de las
              donaciones o subsidios recibidos en el ejercicio.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.12 Egresos</Form.Text>

          <Form.Group>
            <Form.Label>
              80. ¿Se cuenta con expedientes de personal? ¿Cada qué tiempo se
              actualizan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              81. ¿Bajo qué esquema laboral se encuentran contratados los
              empleados?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              82. ¿Cuáles son los procedimientos de control aplicables a la
              determinación de las nóminas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              83. ¿Cuáles son los canales de comunicación para informar al
              personal las diversas prestaciones otorgadas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              84. ¿Cuáles son las deducciones efectuadas a las nóminas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              85. ¿Cómo se manejan las resoluciones judiciales recibidas por
              pensiones alimenticias?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              86. ¿Existe un control de movimientos de personal (alta/bajas)?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.13 Obligaciones Tributarias
          </Form.Text>

          <Form.Group>
            <Form.Label>
              87. ¿Qué área o personal se encarga de determinar los impuestos a
              los que por Ley está sujeta la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              88. ¿Se tiene preparado un calendario de obligaciones fiscales?
              Anexar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              89. ¿Se determina una base de impuestos a fin de calcular y
              enterar correctamente el impuesto sobre nóminas? Describir el
              procedimiento para obtener la base de impuesto.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              90. ¿Se encuentran inscritos los trabajadores al ISSSTE, o IMSS?
              ¿Cuentan con acuerdo o convenio celebrado entre la Entidad y estos
              organismos? De ser otra Institución mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              91. ¿Qué percepciones de los trabajadores se acumulan para
              realizar el cálculo de las retenciones de impuestos federales y
              estatales?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              92. ¿Se cuenta con tabuladores para el cálculo de ISR por sueldos
              y salarios, aportaciones de seguridad social, y demás obligaciones
              fiscales de los trabajadores de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              93. ¿Se emiten recibos de nómina CFDI como comprobante del pago de
              remuneraciones al personal?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              94. ¿Se emiten CFDI para comprobar sus ingresos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.14 Adquisiciones</Form.Text>

          <Form.Group>
            <Form.Label>
              95. ¿Se cuenta con un padrón de proveedores y prestadores de
              servicios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              96. ¿Cuál es el procedimiento que aplican para comprobar que los
              bienes y servicios adquiridos fueron efectivamente recibidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              97. ¿Se tiene algún tipo de control que permita la verificación
              entre los bienes solicitados y los adquiridos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              98. ¿Se cuenta con un manual de procedimientos para el registro y
              control de la documentación comprobatoria de las adquisiciones,
              arrendamientos o contratación de servicios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              99. ¿Se tiene un área o personal responsable de verificar la
              comprobación documental de las adquisiciones, arrendamiento y
              contratación de servicios? Mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              100. ¿Se cuentan con el Acta de Recepción o factura del proveedor
              o prestador de servicios de la Entidad, relativas a las
              adquisiciones, arrendamientos o contratación de servicios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.15 Infraestructura para el Desarrollo
          </Form.Text>

          <Form.Group>
            <Form.Label>
              101. ¿Se tiene aperturada una cuenta contable por cada obra y
              acción realizada o se registra en conjunto?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              102. ¿Cuál es el procedimiento para pagar las estimaciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              103. ¿Se cuenta con un listado de la documentación que integra los
              expedientes de licitaciones realizadas por la Entidad? En caso
              afirmativo, proporcionar copia del listado.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              104. ¿Quién es el responsable de integrar y custodiar los
              expedientes unitarios de obra y acciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              105. ¿Se tiene un control de las obras en cuanto a fechas (de
              inicio, de cierre, contratadas y reales)?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.16 Presupuesto</Form.Text>

          <Form.Group>
            <Form.Label>
              106. ¿Qué área o personal está encargado de formular el
              presupuesto?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              107. ¿Se cuenta con lineamientos internos para la elaboración del
              presupuesto? Anexarlos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              108. ¿Se reportan y analizan las variaciones en el
              presupuesto?¿Quién realiza el análisis y a quién se reportan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              109. ¿Cuál es el tratamiento que se les da a los remanentes
              presupuestales que no son utilizados al finalizar el ejercicio?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              110. ¿Se registraron las transferencias en las ampliaciones
              presupuestales de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              111. ¿En las transferencias se cuenta con soporte documental y sus
              autorizaciones correspondientes?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              112. ¿Se cuenta con la autorización correspondiente de las
              modificaciones presupuestales de las obras realizadas con recursos
              federales? Mencionar los oficios.
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">4.17 Honorarios</Form.Text>

          <Form.Group>
            <Form.Label>
              113. ¿Se celebraron contratos por honorarios profesionales o
              sueldos asimilables a salarios? y ¿Cuántas personas se encuentran
              en cada una de estas modalidades?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              114. ¿Existen medidas de control para la emisión de contratos de
              honorarios y asimilados a salarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.18 Medios de comunicación
          </Form.Text>

          <Form.Group>
            <Form.Label>
              115. ¿Se tiene un expediente de los contratos y convenios
              celebrados con prestadores de servicios de comunicación o se
              archivan con los registros contables?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              116. ¿Qué lineamientos o políticas aplican en materia de
              contratación de medios de comunicación?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              117. ¿Se llevaron a cabo operaciones por conceptos de difusión e
              información, servicio de impresión, publicación; así como el
              servicio de comunicación social? ¿Cuáles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Text className="h4">5. Seguimiento de los Controles</Form.Text>

          <hr />

          <Form.Text className="lead mb-2">5.1 Auditorías Internas</Form.Text>

          <Form.Group>
            <Form.Label>
              118. ¿Existe un órgano interno de control o personal encargado de
              evaluar el sistema de control interno en la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              119. ¿Cuántas revisiones se hicieron en el ejercicio que se
              encuentren sustentadas con un informe de control interno?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              120. ¿Cómo le ayudan a mejorar el trabajo desarrollado en su área
              las acciones que promueve el Órgano Interno de Control, en la
              verificación de las actividades de control utilizadas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              121. ¿Qué actividades de control se han establecido para verificar
              que las deficiencias detectadas en la operación de los recursos,
              han sido corregidas, y se han implementado las acciones de mejora
              respectivas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              122. ¿Cómo asegura que el personal de mando de su área realiza
              actualizaciones a los controles ejecutados por su personal
              asignado, respecto de los recursos ejercidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              123. ¿Qué actividades de control lleva a cabo el personal de mando
              para ejercer una evaluación sobre las actividades de control de su
              personal, a fin de cerciorarse de que los resultados que le son
              presentados, tienen la confiabilidad y oportunidad requerida para
              efectuar una adecuada toma de decisiones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              124. ¿Qué actividades de control se han establecido para evaluar
              el cumplimiento de la normatividad aplicable en la administración
              y operación?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              125. ¿Qué acciones se han establecido para evaluar que el sistema
              de control interno refleje transparencia en las operaciones
              realizadas con los recursos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" />
          </Form.Group>
        </Form>
      </Layout>
    );
  }
}

export default CCI;
